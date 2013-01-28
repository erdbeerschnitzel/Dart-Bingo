/**
 * client-side of Online-Bingo
 * multiplayer main
 **/

import 'dart:html';
import 'dart:json';
import "dart:math";
part 'Gamecard.dart';
part 'RandomNumberGenerator.dart';

// globals
Gamecard playercard;
WebSocket _ws;
String _currentNumber = "42";
bool _first = true;
bool _gameStarted = false;
bool _bingoSent = false;
bool _debug = false;
InputElement _messageInput;
InputElement _nicknameInput;
InputElement _messageWindow;


/**
 * main entry point - attaches handlers and inits objects
 **/
void main() {

 // attach handlers
 query('#getGamecard').on.click.add(GamecardHandler);

 query('#startGame').on.click.add(GameHandler);

 query('#Bingo').on.click.add(BingoHandler);

 _messageWindow = query("#messagewindow");

 _messageWindow.value = "";

 show('Welcome to Bingo');



 _ws =  new WebSocket("ws://localhost:8080/bingo");

 _ws.on.message.add((MessageEvent e) {

   if(!e.data.toString().contains("CHAT:")){

     query('#status').innerHTML = "${e.data}";
   }

   if(handleMessage(e.data) != ""){

     _ws.send(handleMessage(e.data));
   }

 });

 addChatEventHandlers();

}




// **** HANDLERS ****
// ******************


/**
 * handle the next-number-event
 * gameevent is auto-passed by runtime
 **/
void GameHandler(gameevent){

  if(!_first){

    if(!_gameStarted){

      if(query('#startGame').value == "I'm ready!"){

        _ws.send("client ready");

        query('#startGame').value = "I'm not ready!";

        query('#getGamecard').on.click.remove(GamecardHandler);
      }
      else {

        _ws.send("client notready");

        query('#startGame').value = "I'm ready!";

        query('#getGamecard').on.click.add(GamecardHandler);
      }
    }

  }
  else {

    show("Get some Gamecards first!");
  }

}


/**
 * handle click on "Get new Gamecards"
 *
 * sends msg to server to request new gamecard
 */
void GamecardHandler(gamecardevent){

    playercard = new Gamecard();

    _ws.send("getGamecard");

}


/**
 * handles clicks on the bingo button
 * if player has bingo the marked fields of the gamecard
 * are sent to the server
 *
 * button is renamed to "New Round" on round end
 * click on "New Round" reenables other buttons and renames this one
 **/
void BingoHandler(bingoevent){

  if(query('#Bingo').value.contains("Bingo!")){

    if(!_gameStarted){

      show("The Game hasn't started yet or already ended!");
    }
    else {

      if(playercard.checkBingo()) {

       _ws.send("THISISBINGO:${playercard.toWSMessage()}");
       _bingoSent = true;
       show("Bingo sent to server");
      }
      else {

        show("You don't have a Bingo!");
      }
    }

  }

  // reenable buttons for new round
  if(query('#Bingo').value.contains("New Round")){

    query('#Bingo').value = "Bingo!";

    query('#startGame').on.click.add(GameHandler);
    query('#startGame').hidden = false;
    query('#startGame').value = "I'm ready!";
    query('#getGamecard').hidden = false;
    query('#getGamecard').on.click.add(GamecardHandler);

    playercard = new Gamecard();
    query('#playertable').innerHTML = playercard.createCardHTML(false);
  }



}

/**
 * handle websocket messages from server
 * TODO: refactor to own file
 * returns string for websocket client answer
 **/
String handleMessage(String msg){


  if(msg == "Hello from Server!") return "client hello!";

  /**
   * receiving a gamecard string
   **/
  if(msg.contains("GAMECARD:")){

    print("received: $msg");
    playercard = new Gamecard.fromServer(msg);
    query('#playertable').innerHTML = playercard.createCardHTML(false);

    addCellClickHandlers();

    show("Gamecard created!");

    _first = false;
  }

  /**
   * receiving number of other players
   **/
  if(msg.contains('Other Players:')) {

    show(msg);
    return "";
  }

  /**
   * receiving chat msg
   **/
  if(msg.contains('CHAT:')) {

    msg = msg.replaceFirst("CHAT:", "");

    addMessageToMessageWindow(msg);

    return "";
  }

  /**
   * receiving game start event from server
   * removes buttons
   **/
  if(msg.contains('Starting the Game')) {

    _gameStarted = true;

    query('#startGame').on.click.remove(GameHandler);
    query('#startGame').hidden = true;
    query('#getGamecard').hidden = true;

    return "";
  }

  /**
   * receiving new number from server
   **/
  if(msg.contains('Number') && !msg.contains('of')) {

    _currentNumber = msg.replaceAll("Number: ", "");

    // DEBUG HELP!

    if(_debug){

      for(int i = 0; i < 5; i++){

        for(int x = 0; x < 5; x++){

          if(i == 2 && x == 2){

          }
          else {

            // get element of gamecard table
            TableCellElement el = document.query('#p$i$x');

              // if received number is equal to field number
              if(_currentNumber.toString() == el.innerHTML.toString()){

                //el.style.textDecoration = 'underline';
                el.style.backgroundColor = 'red';
                playercard.fields[i][x] = "0";
              }


          }
        }
      }
    }



    return "";
  }

  /**
   * received bingo event from server
   **/
  if(msg.contains("Player has Bingo. Game stopped.")){

    _gameStarted = false;
    query('#Bingo').value = "New Round";

    if(playercard.checkBingo() && _bingoSent) { show("Bingo! You win this round!");

    } else { show("Other Player has Bingo. Round ended.");
    }


    return "";
  }


  return "";

}


// **** Methods ****
// *****************

void show(String message) {

  document.query('#status').innerHTML = message;

}

void addChatEventHandlers() {

  _messageInput = query("#message");
  _nicknameInput = query("#nickname");
  InputElement messagewindow = query("#messagewindow");

  _messageInput.on.keyPress.add((UIEvent event) {
    if (event.keyCode == 13) {

      _ws.send("CHAT: <${_nicknameInput.value}> ${_messageInput.value}");

      addMessageToMessageWindow(" <${_nicknameInput.value}> ${_messageInput.value}");

      _messageInput.value = "";
    }
  });

}


void addMessageToMessageWindow(String msg){

  String time = "${new Date.now()}";
  time = time.substring(time.indexOf(" ") + 1);
  time = time.split(".")[0];


  if(_messageWindow.value == ""){

    _messageWindow.value = "[$time]$msg";

  }else {
    _messageWindow.value = "${_messageWindow.value}\n[$time]$msg";
  }
}

// add CellClickHandlers to playercard
void addCellClickHandlers(){

  for(int i = 0; i < 5; i++){

    for(int x = 0; x < 5; x++){

      if(i == 2 && x == 2){

      }
      else {

        TableCellElement el = query('#p$i$x');

        el.on.click.add((event2) {

          if(_currentNumber.toString() == el.innerHTML){

            print("muh");
            el.style.textDecoration = 'underline';
            el.style.backgroundColor = 'red';
            playercard.fields[i][x] = "0";
          }

        });
      }
    }
  }
}



void endGame(){

  show("ENDE!");

  query('#startGame').on.click.remove(GameHandler);
}

