#import('dart:html');
#source('Gamecard.dart');

// globals
Gamecard playercard;
WebSocket ws;
int currentNumber = 22;
List<int> addNumbers;
bool first = true;
bool gameStarted = false;

void main() {
 
 // init some Objects
 addNumbers = new List<int>();

 playercard = new Gamecard();
 
 // attach handlers
 document.query('#getGamecard').on.click.add(GamecardHandler);
 
 document.query('#startGame').on.click.add(GameHandler);
 
 document.query('#Bingo').on.click.add(BingoHandler);
 
 show('Welcome to Bingo');
}

// **** HANDLERS ****
// ******************


// handle next number
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
  
    document.query('#playertable').innerHTML = createCard(playercard);
    
    addCellClickHandlers();

    show("Gamecard created!");
    
    first = false;
}


// handle bingo button
void BingoHandler(bingoevent){
  
  if(!gameStarted){
    
    show("The Game has'n started yet!");
  }
  else {
    
    if(checkBingo(playercard)) {
      
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
  
  return "";
  
}

// **** Methods ****
// *****************

void show(String message) {
  
  document.query('#status').innerHTML = message;
  
}

// very static
// TODO: improve card creating algo
String createCard(Gamecard card){
  
  String cardstring = "";
  
  int i = 0;
  int x = 0;
  
  for(List liste in card.fields){
    
    cardstring = cardstring + '<tr>';
    
    for(var value in liste){
      
        // this adds a td element with specific class and specific value
        if(x < 5 && i < 5)  cardstring = cardstring + '<td id="p' + i + x + '"' + 'class=top>' + card.fields[i][x] + '</td>';

        // close the tr element
        if(x == 4){ 
          
          cardstring = cardstring + '</tr>';
          x = 0;
        
        } else {
          x++;
        }
      }

    
    if(i == 4){
      i = 0;
    } else {
      i++;
    }

  }
  
  return cardstring;
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

//
bool checkBingo(Gamecard card){
  
  bool result = true;
  
  for(int i = 0; i < 5; i++){
    
    
    for(int x = 0; x < 5; x++){
      
      if(i == 2 && x == 2){
      }
      else 
      {
      
        if(card.fields[i][x] > 0) result = false;

      }
    }
      
    if(result) return true;    
    
  }
  
  return false;
}

// get a random number between 1 and 99
// no duplicates
int getRandomNumber(){
  
  int a = (Math.random()*100).toInt();
  
  while(a > 99 || a < 1 || (addNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
  
  addNumbers.add(a);
    
  return a;
}



