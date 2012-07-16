/**
 * client-side of Online-Bingo
 * multiplayer main
 **/

#import('dart:html');
#import('dart:json');
#import('js.dart', prefix: 'js');
//#import('C:\\code\\dart\\dart-sdk\\lib\\i18n\\date_format.dart');
#source('Gamecard.dart');

// globals
Gamecard playercard;
WebSocket ws;
String currentNumber = "22";
bool first = true;
bool gameStarted = false;
InputElement _messageInput;
InputElement _nicknameInput;
InputElement _messageWindow;


/**
 * main entry point - attaches handlers and inits objects
 **/
void main() {

 // attach handlers
 document.query('#getGamecard').on.click.add(GamecardHandler);
 
 document.query('#startGame').on.click.add(GameHandler);
 
 document.query('#Bingo').on.click.add(BingoHandler);
 
 _messageWindow = document.query("#messagewindow");
 
 _messageWindow.value = "";
 
 //show('Welcome to Bingo');


 
 ws =  new WebSocket("ws://localhost:8080/bingo");
 
 ws.on.message.add((MessageEvent e) {
   
   if(!e.data.toString().contains("CHAT:")) document.query('#status').innerHTML = "${e.data}";
   
   if(MessageHandler(e.data) != ""){
     
     ws.send(MessageHandler(e.data));
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
  
  if(!first){
  
    if(!gameStarted){
      
      if(document.query('#startGame').value == "I'm ready!"){
        
        ws.send("client ready");
        document.query('#startGame').value = "I'm not ready!";
        document.query('#getGamecard').on.click.remove(GamecardHandler);
      }
      else {
        
        ws.send("client notready");
        document.query('#startGame').value = "I'm ready!";
        document.query('#getGamecard').on.click.add(GamecardHandler);
      }       
    }  

  }
  else {
    
    show("Get some Gamecards first!");
  }

}


// handles gamecard creating
void GamecardHandler(gamecardevent){

    playercard = new Gamecard();
  
    ws.send("getGamecard");
     
}


// handle bingo button
void BingoHandler(bingoevent){
  
  if(!gameStarted){
    
    show("The Game hasn't started yet or already ended!");
  }
  else {
    
    if(playercard.checkBingo()) {
     
     ws.send("THISISBINGO:${playercard.toWSMessage()}");
     show("Bingo sent to server"); 
    }
    else {
      
      show("You don't have a Bingo!");
    }
  }
  
}

// TODO: refactor to own file
String MessageHandler(String msg){
  
  
  if(msg == "Hello from Server!") return "client hello!";
  
  if(msg.contains("GAMECARD:")){

    print("received: $msg");
    playercard = new Gamecard.fromServer(msg);
    document.query('#playertable').innerHTML = playercard.createCardHTML(false);
    
    addCellClickHandlers();

    show("Gamecard created!");
    
    first = false;
  }
    
  
  if(msg.contains('Other Players:')) {
    
    show(msg);
    return "";
  }
  
  if(msg.contains('CHAT:')) {
    
    msg = msg.replaceFirst("CHAT:", "");
    
    addMessageToMessageWindow(msg);
        
    return "";
  }
  
  if(msg.contains('Starting the Game')) {
    
    gameStarted = true;

    document.query('#startGame').on.click.remove(GameHandler);
    document.query('#startGame').remove();
    document.query('#getGamecard').remove();
    
    return "";
  }
  
  if(msg.contains('Number') && !msg.contains('of')) {
    
    currentNumber = msg.replaceAll("Number: ", "");
    
    // debug help
    
    for(int i = 0; i < 5; i++){
      
      for(int x = 0; x < 5; x++){
        
        if(i == 2 && x == 2){
          
        }
        else {
          
          TableCellElement el = document.query('#p$i$x');
  
            if(currentNumber.toString() == el.innerHTML.toString()){
              
              //el.style.textDecoration = 'underline';
              el.style.backgroundColor = 'red';
              playercard.fields[i][x] = "0";
            }

       
        }
      }    
    }
    
    //
    

    return "";
  }
  
  if(msg.contains("Player has Bingo. Game stopped.")){
    
    gameStarted = false;
    show("Other Player has Bingo. Round ended.");
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
      
      ws.send("CHAT: <${_nicknameInput.value}> ${_messageInput.value}");
  
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
          
          if(currentNumber.toString() == el.innerHTML){
            
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
  
  document.query('#startGame').on.click.remove(GameHandler);
}

