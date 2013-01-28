/**
 * Manages WebSocket messages and bingo game rounds
 *
 **/

library MessageHandler;
import "dart:io";
import "dart:isolate";
import "dart:math";
import 'dart:async';
part "client/Gamecard.dart";
part "client/RandomNumberGenerator.dart";

class MessageHandler{


  List<WebSocketConnection> connections;
  List clients;

  RandomNumberGenerator RNG;
  Timer _messageTimer;
  bool _gameStarted = false;
  int _timerTick = 15000;

  // standard constructor
  MessageHandler(){

    clients = new List();
    connections = new List<WebSocketConnection>();
    RNG = new RandomNumberGenerator();
  }

  /**
   * remove a websocket connection client from lists
   * if number of clients is below 2 stop the game
   **/
  void removeConnection(WebSocketConnection conn) {

    int index = connections.indexOf(conn);

    if (index > -1) {
      connections.removeRange(index, 1);
      clients.removeRange(index, 1);
    }

    if(clients.length < 2) {

      log("Only one client left...");

      stopTimer();

    }

    sendMessageToAllClients("Number of Players: ${(connections.length)}");
  }

  // send a message to all WebSocket clients
  void sendMessageToAllClients(String msg){

      connections.forEach((WebSocketConnection conn) => conn.send(msg));
  }

  // check incoming WebSocket messages
  void delegateMessage(String msg, WebSocketConnection originalconnection){

    log("Client sent message: $msg");

    // handle client connect
    if(msg.contains("client hello") && connections.length > 1) sendMessageToAllClients("Other Players: ${(connections.length - 1)}");

    // handle single client ready
    if(msg.contains("client ready") && connections.length == 1){

      connections[0].send("You need to wait for other players!");
      clients[0].ready = true;
    }


    // handle gamecard request
    if(msg.contains("getGamecard")){

      Gamecard gamecard = new Gamecard();

      originalconnection.send(gamecard.toWSMessage());

      List elems = gamecard.toWSMessage().replaceFirst("GAMECARD:", "").split(",");

      clients.forEach((var client) {

        if(client.con == originalconnection){
          client.gamecard = gamecard;
          log("gamecard saved for client");
        }

      });
    }


    // handle chat
    if(msg.contains("CHAT:")){

      connections.forEach((WebSocketConnection conn) {

        if(conn != originalconnection) conn.send(msg);
      });
    }

    // handle client ready
    if(msg.contains("client ready") && connections.length > 1){

      clients.forEach((var client) {

        if(client.con == originalconnection) client.ready = true;

      });

      sendMessageToAllClients("Number of Players: ${(connections.length)}   Players Ready: ${getNumberOfReadyClients()}");
    }

    // handle client not ready
    if(msg.contains("client notready") && connections.length > 0){

      clients.forEach((var client) {

        if(client.con == originalconnection) {
          client.ready = false;
          log("client set status to not ready");
        }

      });

    }

    // when all clients are ready start the game
    if(getNumberOfReadyClients() == clients.length && getNumberOfReadyClients() > 1 && !_gameStarted) {

      _gameStarted = true;
      _messageTimer = new Timer.repeating(_timerTick, timeHandler);
      log("Game started...");
      sendMessageToAllClients("All players are ready! Starting the Game!");
    }


    // handle bingo
    if(msg.contains("THISISBINGO:")) {

      log("Client signalized Bingo!");

      msg = msg.replaceFirst("THISISBINGO:", "");

      msg = msg.replaceFirst("GAMECARD:", "");

      List<String> values = msg.split(",");

      if(values.length > 2){

        clients.forEach((var client) {

          if(client.con == originalconnection){

            log("client found");
            log("client ws msg: ${client.gamecard.toWSMessage()}");

            List<String> originalvalues = client.gamecard.toWSMessage().replaceFirst("GAMECARD:", "").split(",");

            for(int i = 0; i < values.length; i++){

              RNG.addNumbers.forEach((var number) {

                  if(originalvalues[i] == "$number") client.gamecard.updateField(originalvalues[i]);

                });
            }

            if(client.gamecard.checkBingo()){

              log("Bingo!");
              stopTimer();
              sendMessageToAllClients("Player has Bingo. Game stopped.");
            }
          }

        });

      }
      else {

        log("Something is wrong with the client msg: $msg");
      }
    }
  }


    void timeHandler(timeevent) {

      if(_gameStarted && getNumberOfReadyClients() > 1 && RNG.addNumbers.length < 75) { sendMessageToAllClients("Number: ${RNG.getRandomNumber()}");

      } else { stopTimer();
      }
    }


    /**
     * stops the timer which sends numbers to clients
     * sets gameStarted to false if not already set
     **/
    void stopTimer(){

      if(_messageTimer != null) _messageTimer.cancel();

      if(_gameStarted){

        log("Game stopped. Timer stopped.");

        _gameStarted = false;

        clients.forEach((var client) {
            client.ready = false;
        });

        // clear list for new game
        RNG = new RandomNumberGenerator();
      }
      else { log("Game ended. Timer stopped.");
      }

    }

    /**
     * check how many clients are ready to play
     **/
    int getNumberOfReadyClients(){

      int numberReady = 0;

      clients.forEach((var client) {

        if(client.ready) numberReady++;
      });

      return numberReady;
    }


    // simple logging method printing time and msg
    void log(var msg) => print("${new Date.now()}: $msg");

}