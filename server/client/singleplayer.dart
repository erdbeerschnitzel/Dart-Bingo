/**
 * client-side of Online-Bingo
 * singleplayer main
 **/
#import('dart:html');
#source('Gamecard.dart');

// globals
Gamecard playercard;
Gamecard computercard;
int currentNumber = 22;
List<int> addNumbers;
bool active = false;
bool first = true;

void main() {
 
 // init some Objects
 addNumbers = new List<int>();
 
 computercard = new Gamecard();
 
 playercard = new Gamecard();
 
 // attach handlers
 document.query('#getGamecard').on.click.add(GamecardHandler);
 
 document.query('#startGame').on.click.add(GameHandler);
 
 document.query('#Bingo').on.click.add(BingoHandler);
 
 show('Welcome to Bingo');
}

// **** HANDLERS ****
// ******************

// handles gamecard creating
void GamecardHandler(gamecardevent){
     
    computercard = new Gamecard();
    
    playercard = new Gamecard();
  
    document.query('#playertable').innerHTML = playercard.createCardHTML(false);
    
    addCellClickHandlers();

    document.query('#computertable').innerHTML = computercard.createCardHTML(true);
    
    show("Gamecards created!");
    
    first = false;
}

// handle next number and computer logic
void GameHandler(gameevent){

  if(!first){
  
  currentNumber = getRandomNumber();  
  show("the current number is $currentNumber");
  
  for(int i = 0; i < 5; i++){
    
    
    for(int x = 0; x < 5; x++){
      
      if(computercard.fields[i][x] == currentNumber){
        
        document.query('#c$i$x').style.textDecoration = 'underline';
        document.query('#c$i$x').style.backgroundColor = 'red';
        computercard.fields[i][x] = 0;
        
        if(computercard.checkBingo()) endGame();
      }
      
    }
    
  }
  
    active = true;
    document.query('#getGamecard').on.click.remove(GamecardHandler);
    document.query('#startGame').value = "Next Number";
    
  }
  else {
    
    show("Get some Gamecards first!");
  }

}


// handle bingo button
void BingoHandler(bingoevent){
  
  if(!active){
    
    show("You need to start the Game!");
  }
  else {
    
    if(playercard.checkBingo()){
      active = false;
      show("You have a Bingo! Congratulations!");
    }
  }
  
}

// **** Methods ****
// *****************

void show(String message) {
  
  document.query('#status').innerHTML = message;
  
}

void debug(String message) {
  
  document.query('#debug').innerHTML = message;
  
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

