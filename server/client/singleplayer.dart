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
  
    document.query('#playertable').innerHTML = createCard(playercard, false);
    
    addCellClickHandlers();

    document.query('#computertable').innerHTML = createCard(computercard, true);
    
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
        
        if(checkBingo(computercard)) endGame();
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

// very static
// TODO: improve card creating algo
String createCard(Gamecard card, bool forComputer){
  
  String cardstring = "";
  
  int i = 0;
  int x = 0;
  
  for(List liste in card.fields){
    
    cardstring = cardstring + '<tr>';
    
    for(var value in liste){
      
        // this adds a td element with specific class and specific value
       if(forComputer){
          
          if(x < 5 && i < 5)  cardstring = cardstring + '<td id="c' + i + x + '"' + 'class=top>' + card.fields[i][x] + '</td>';
        }
        else {
          
          if(x < 5 && i < 5)  cardstring = cardstring + '<td id="p' + i + x + '"' + 'class=top>' + card.fields[i][x] + '</td>';
          
        }
        
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
  
  String deb = "";
  
  for(int i = 0; i < 5; i++){
    
    
    for(int x = 0; x < 5; x++){
      
      if(i == 2 && x == 2){
      }
      else 
      {
      
        if(card.fields[i][x] > 0) result = false;
        
        deb = deb + "$i$x: " + card.fields[i][x] + " ";
      }
    }
      
    if(result) return true;    
    
  }
  
  debug("the current number is $currentNumber and the result is $deb");
  
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

