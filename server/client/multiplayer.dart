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
int currentNumber = 22;
List<int> addNumbers;
bool first = true;
bool gameStarted = false;


/**
 * main entry point - attaches handlers and inits objects
 **/
void main() {

 // init some Objects
 addNumbers = new List<int>();

 playercard = new Gamecard();

 
 // attach handlers
 document.query('#getGamecard').on.click.add(GamecardHandler);
 
 document.query('#startGame').on.click.add(GameHandler);
 
 document.query('#Bingo').on.click.add(BingoHandler);
 
 //show('Welcome to Bingo');


 
 ws =  new WebSocket("ws://localhost:8080/bingo");
 
 ws.on.message.add((MessageEvent e) {
   document.query('#status').innerHTML = "${e.data}";
   
   if(MessageHandler(e.data) != ""){
     
     ws.send(MessageHandler(e.data));
   }
   
 });
 
}


  

// **** HANDLERS ****
// ******************


/**
 * handle the next-number-event
 * gameevent is auto-passed by runtime
 **/
void GameHandler(gameevent){
  
  if(!first){
  


    document.query('#getGamecard').on.click.remove(GamecardHandler);
    document.query('#startGame').on.click.remove(GameHandler);
    document.query('#startGame').value = "I'm ready!";
    document.query('#startGame').on.click.add(ReadyHandler);

  }
  else {
    
    show("Get some Gamecards first!");
  }

}

// handles ready button
void ReadyHandler(readyevent){
  
  
  if(!gameStarted){
    
    if(document.query('#startGame').value == "I'm ready!"){
      
      ws.send("client ready");
      document.query('#startGame').value = "I'm not ready!";
    }
    else {
      
      ws.send("client notready");
      document.query('#startGame').value = "I'm ready!";
    }       
  }  
}

// handles gamecard creating
void GamecardHandler(gamecardevent){

    playercard = new Gamecard();
  
    ws.send("getGamecard");
    
    //document.query('#playertable').innerHTML = playercard.createCardHTML(false);
    
    
}


// handle bingo button
void BingoHandler(bingoevent){
  
  if(!gameStarted){
    
    show("The Game hasn't started yet or already ended!");
  }
  else {
    
    if(playercard.checkBingo()) {
      
      ws.send("thisisbingo");
    }
    else {
      
      show("You don't have a Bingo!");
    }
  }
  
}

String MessageHandler(String msg){
  
  
  if(msg == "Hello from Server!") return "client hello!";
  
  if(msg.contains("GAMECARD:")){
    show(msg);
    playercard = new Gamecard.fromServer(msg);
    document.query('#playertable').innerHTML = playercard.createCardHTML(false);
    
    //addCellClickHandlers();

    //show("Gamecard created!");
    
    first = false;
  }
    
  
  if(msg.contains('Other Players:')) {
    
    show(msg);
    return "";
  }
  
  if(msg.contains('Starting the Game')) {
    
    gameStarted = true;

    document.query('#startGame').on.click.remove(ReadyHandler);
    document.query('#startGame').remove();
    document.query('#getGamecard').remove();
    
    return "";
  }
  
  if(msg.contains('Number')) {
    
    currentNumber = msg.replaceAll("Number: ", "");

    return "";
  }
  
  if(msg.contains("Player has Bingo. Game stopped.")){
    
    gameStarted = false;
    return "";
  }
  
  return "";
  
}

// **** Methods ****
// *****************

void show(String message) {
  
  document.query('#status').innerHTML = message;
  
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
          
          if(currentNumber.toString() == el.innerHTML.toString()){
            
            el.style.textDecoration = 'underline';
            el.style.backgroundColor = 'red';
            playercard.fields[i][x] = 0;
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

