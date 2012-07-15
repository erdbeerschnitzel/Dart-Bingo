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

//AJAX request for an XML Document.
XMLHttpRequest RSSRequestObject;

String rssFeedURL = "http://www.scribegriff.com/studios/index.php?rest/"
        "blog&f=getPosts&cat_url=Google/Dart&count_only=1";

/**
 * main entry point - attaches handlers and inits objects
 **/
void main() {

 // init some Objects
 addNumbers = new List<int>();

 playercard = new Gamecard();
 
 try{
   
   //throw "summ!";
   
 }catch(Exception x){
   
   show("ex caught: $x");
 }
 
 String listAsJson = '["Dart",0.8]'; // input List of data
 List parsedList = JSON.parse(listAsJson);

 
 // attach handlers
 document.query('#getGamecard').on.click.add(GamecardHandler);
 
 document.query('#startGame').on.click.add(GameHandler);
 
 document.query('#Bingo').on.click.add(BingoHandler);
 
 //show('Welcome to Bingo');
 //show(parsedList[1]);

 getRssFeed();
 
 var parser = new DOMParser(); 
 //document = parser.parseFromString('<foo><bar></bar></foo>', 'text/xml'); 
 
 
 
}

void getRssFeed() {
  RSSRequestObject = new XMLHttpRequest();
  RSSRequestObject.open("GET", rssFeedURL, true);
  RSSRequestObject.on.readyStateChange.add((e) {
  reqChange();
});
}

void reqChange() {
  if (RSSRequestObject.readyState == 4 && RSSRequestObject.status == 200) {
    Document feedDocument = RSSRequestObject.responseXML;
    show(RSSRequestObject.responseXML.toString());
  } else { 
    show(RSSRequestObject.statusText); 
  }
}
  

// **** HANDLERS ****
// ******************


/**
 * handle the next-number-event
 * gameevent is auto-passed by runtime
 **/
void GameHandler(gameevent){
  
  if(!first){
  
  ws =  new WebSocket("ws://localhost:8080/bingo");
  
  ws.on.message.add((MessageEvent e) {
    document.query('#status').innerHTML = "${e.data}";
    
    if(MessageHandler(e.data) != ""){
      
      ws.send(MessageHandler(e.data));
    }
    
  });

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
      //(query('#startGame') as ButtonElement).value = "I'm not ready!";
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
  
    document.query('#playertable').innerHTML = playercard.createCardHTML(false);
    
    addCellClickHandlers();

    show("Gamecard created!");
    
    first = false;
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



// get a random number between 1 and 99
// no duplicates
int getRandomNumber(){
  
  int a = (Math.random()*100).toInt();
  
  while(a > 99 || a < 1 || (addNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
  
  addNumbers.add(a);
    
  return a;
}



