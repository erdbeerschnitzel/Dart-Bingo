/**
 * client-side of Online-Bingo
 * multiplayer main
 **/

#import('dart:html');
#import('dart:json');
#import("dart:math");
#source('Gamecard.dart');

// globals
Gamecard _playercard;
WebSocket _ws;
String _currentNumber = "42";
bool _first = true;
bool _gameStarted = false;
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
 
 _messageWindow = document.query("#messagewindow");
 
 _messageWindow.value = "";
 
 //show('Welcome to Bingo');


 
 _ws =  new WebSocket("ws://localhost:8080/bingo");
 
 _ws.on.message.add((MessageEvent e) {
   
   if(!e.data.toString().contains("CHAT:")){
     
     query('#status').innerHTML = "${e.data}";
   }
   
   if(MessageHandler(e.data) != ""){
     
     _ws.send(MessageHandler(e.data));
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
      
      if(document.query('#startGame').value == "I'm ready!"){
        
        _ws.send("client ready");
        document.query('#startGame').value = "I'm not ready!";
        document.query('#getGamecard').on.click.remove(GamecardHandler);
      }
      else {
        
        _ws.send("client notready");
        document.query('#startGame').value = "I'm ready!";
        document.query('#getGamecard').on.click.add(GamecardHandler);
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

    _playercard = new Gamecard();
  
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
  
  if(document.query('#Bingo').value.contains("Bingo!")){
   
    if(!_gameStarted){
      
      show("The Game hasn't started yet or already ended!");
    }
    else {
      
      if(_playercard.checkBingo()) {
       
       _ws.send("THISISBINGO:${_playercard.toWSMessage()}");
       show("Bingo sent to server"); 
      }
      else {
        
        show("You don't have a Bingo!");
      }
    }    
    
  }
  
  // reenable buttons for new round
  if(document.query('#Bingo').value.contains("New Round")){
    
    document.query('#Bingo').value = "Bingo!";
    
    document.query('#startGame').on.click.add(GameHandler);
    document.query('#startGame').hidden = false;
    document.query('#startGame').value = "I'm ready!";
    document.query('#getGamecard').hidden = false;
    document.query('#getGamecard').on.click.add(GamecardHandler);
    
    _playercard = new Gamecard();
    document.query('#playertable').innerHTML = _playercard.createCardHTML(false);
  }
  

  
}

// TODO: refactor to own file
String MessageHandler(String msg){

  
  if(msg == "Hello from Server!") return "client hello!";
  
  /**
   * receiving a gamecard string
   **/
  if(msg.contains("GAMECARD:")){

    //print("received: $msg");
    _playercard = new Gamecard.fromServer(msg);
    document.query('#playertable').innerHTML = _playercard.createCardHTML(false);
    
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

    document.query('#startGame').on.click.remove(GameHandler);
    document.query('#startGame').hidden = true;
    document.query('#getGamecard').hidden = true;
    
    return "";
  }
  
  /**
   * receiving new number from server
   **/
  if(msg.contains('Number') && !msg.contains('of')) {
    
    _currentNumber = msg.replaceAll("Number: ", "");
    
    // DEBUG HELP!
    
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
              _playercard.fields[i][x] = "0";
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
    document.query('#Bingo').value = "New Round";
    
    if(!_playercard.checkBingo()){
      
      show("Other Player has Bingo. Round ended.");      
    }
    else {
      show("Bingo! You win this round!");
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
  
  _messageInput = document.query("#message");
  _nicknameInput = document.query("#nickname");
  InputElement messagewindow = document.query("#messagewindow");
  
  _messageInput.on.keyPress.add((event) {
    if (event.keyCode == 13) { 
      
      _ws.send("CHAT: <${_nicknameInput.value}> ${_messageInput.value}");
  
      addMessageToMessageWindow(" <${_nicknameInput.value}> ${_messageInput.value}");
        
      _messageInput.value = "";
    }      
  });
  
  
  _nicknameInput.on.keyPress.add((event) {
    if (event.keyCode == 13) { 
      //ws.send(_nicknameInput.value);
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
        
        TableCellElement el = document.query('#p$i$x');
        
        el.on.click.add((event2) {
          
          if(_currentNumber.toString() == el.innerHTML){
            
            el.style.textDecoration = 'underline';
            el.style.backgroundColor = 'red';
            _playercard.fields[i][x] = "0";
          }

        });         
      }
    }    
  }
}



void endGame(){
  
  show("ENDE!");
  
  document.query('#startGame').on.click.remove(GameHandler);
}

