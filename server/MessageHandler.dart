/**
 * Manages WebSocket messages
 * 
 **/

#library("MessageHandler");
#import("dart:io");
#import("dart:isolate");
#source("client/Gamecard.dart");

class MessageHandler{
  

  List<WebSocketConnection> connections;
  List clients;
  List<int> addedNumbers;
  
  Timer messageTimer;
  bool gameStarted = false;
  
  // standard constructor
  MessageHandler(){
    
    clients = new List();
    connections = new List<WebSocketConnection>();
    addedNumbers = new List<int>();
  }
  
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
      
      connections.forEach((WebSocketConnection conn) {
        conn.send(msg);
      });  
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
      
      log("returning gamecard with ${elems.length} elements: ${gamecard.toWSMessage()}");
      
      clients.forEach((var client) {
        
        if(client.con == originalconnection) client.gamecard = gamecard;
        
        log("gamecard saved for client");

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
    if(getNumberOfReadyClients() == clients.length && getNumberOfReadyClients() > 1 && !gameStarted) {
      
      gameStarted = true;
      startTimer();
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
        
        log("Bingo msg seems ok");
           
        
        log("Searching client...");
        
        clients.forEach((var client) {
          
          if(client.con == originalconnection){
            
            log("client found");
            log("client ws msg: ${client.gamecard.toWSMessage()}");
            List<String> originalvalues = client.gamecard.toWSMessage().replaceFirst("GAMECARD:", "").split(",");
            
            log("originalvalues  has ${originalvalues.length} elements");
            log("values  has ${values.length} elements");
           
            for(int i = 0; i < values.length; i++){
              
              print("check ${values[i]} and ${originalvalues[i]}");
              
       
                addedNumbers.forEach((var number) {
                  //print("${originalvalues[i]} vs $number");
                  if(originalvalues[i] == "$number"){
                    
                    log("number was in original values");
                    client.gamecard.updateField(originalvalues[i]);
                  }

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
        
        log("Something is wrong with the client msg");   
      }               
    }    
  }
    
  
    void timeHandler(timeevent) {
    
      if(gameStarted && getNumberOfReadyClients() > 1 && addedNumbers.length < 99){
        
        sendMessageToAllClients("Number: ${getRandomNumber()}");
      }
      else {
        stopTimer();
      }
      
    
    }
    
    void startTimer(){
    
      if(messageTimer == null) messageTimer = new Timer.repeating(2000, timeHandler);
      
    }
    
    /**
     * stops the timer which sends numbers to clients
     * sets gameStarted to false if not already set
     **/
    void stopTimer(){
      
      if(messageTimer != null) messageTimer.cancel();
      
      if(gameStarted){
        
        log("Game stopped. Timer stopped.");
        
        gameStarted = false;
        
        // clear list for new game
        addedNumbers = new List<int>();
      }
      else {
        
        log("Game ended. Timer stopped.");
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
    
    // get a random number between 1 and 99
    // no duplicates
    int getRandomNumber(){
      
      int a = (Math.random()*100).toInt();
      
      while(a > 99 || a < 1 || (addedNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
      
      addedNumbers.add(a);
        
      return a;
    }
    
    
    // simple logging method printing time and msg
    void log(String msg) => print("${new Date.now()}: $msg");  

}