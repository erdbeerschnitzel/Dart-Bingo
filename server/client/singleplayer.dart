/**
 * client-side of Online-Bingo
 * singleplayer main
 **/
#import('dart:html');
#import('dart:math');
#source('Gamecard.dart');
#source('RandomNumberGenerator.dart');

// globals
Gamecard playercard;
Gamecard computercard;
RandomNumberGenerator RNG;
int currentNumber = 42;

bool active = false;
bool first = true;

void main() {
 
 // init some Objects

 computercard = new Gamecard();
 
 playercard = new Gamecard();
 
 // attach handlers
 query('#getGamecard').on.click.add(GamecardHandler);
 
 query('#startGame').on.click.add(GameHandler);
 
 query('#Bingo').on.click.add(BingoHandler);
 
 show('Welcome to Bingo');
}

// **** HANDLERS ****
// ******************

// handles gamecard creating
void GamecardHandler(gamecardevent){
     
    RNG = new RandomNumberGenerator();
  
    computercard = new Gamecard();
    
    playercard = new Gamecard();
  
    query('#playertable').innerHTML = playercard.createCardHTML(false);
    
    addCellClickHandlers();

    query('#computertable').innerHTML = computercard.createCardHTML(true);
    
    show("Gamecards created!");
    
    first = false;
}

// handle next number and computer logic
void GameHandler(gameevent){

  if(!first){
  
    currentNumber = RNG.getRandomNumber();  
    show("the current number is $currentNumber");
    
    for(int i = 0; i < 5; i++){
     
      for(int x = 0; x < 5; x++){
        
        if(computercard.fields[i][x] == currentNumber){
          
          query('#c$i$x').style.textDecoration = 'underline';
          query('#c$i$x').style.backgroundColor = 'red';
          computercard.fields[i][x] = "0";
          
          if(computercard.checkBingo()) endGame();
        }      
      }    
    }
  
    active = true;
    document.query('#getGamecard').on.click.remove(GamecardHandler);
    document.query('#startGame').value = "Next Number";
    
  }
  else show("Get some Gamecards first!");

}


// handle bingo button
void BingoHandler(bingoevent){
  
  if(!active) show("You need to start the Game!");

  else {
    
    if(playercard.checkBingo()){
      active = false;
      show("You have a Bingo! Congratulations!");
    }
    else show("You don't have a Bingo!");

  }
  
}

// **** Methods ****
// *****************

void show(String message) {
  
  query('#status').innerHTML = message;
  
}

void debug(String message) {
  
  query('#debug').innerHTML = message;
  
}

// add CellClickHandlers to playercard
void addCellClickHandlers(){
  
  for(int i = 0; i < 5; i++){
    
    for(int x = 0; x < 5; x++){
      
      if(i == 2 && x == 2) {}
      else {
        
        TableCellElement el = document.query('#p$i$x');
        
        el.on.click.add((event2) {
          
          if(currentNumber.toString() == el.innerHTML.toString()){
            
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
  
  show("The computer has won the round!");
  
  document.query('#startGame').on.click.remove(GameHandler);
}

