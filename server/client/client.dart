#import('dart:html');
#source('Gamecard.dart');

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

void show(String message) {
  
  document.query('#status').innerHTML = message;
  
}

void GamecardHandler(event){
     
    computercard = new Gamecard();
    
    playercard = new Gamecard();
  
    document.query('#playertable').innerHTML = createCard(playercard, false);
    
    addCellClickHandlers();

    document.query('#computertable').innerHTML = createCard(computercard, true);
    
    show("Gamecards created!");
}

// very static
// TODO: improve card creating algo
String createCard(Gamecard card, bool forComputer){
  
  String cardstring = "";
  
  bool free = false;
  
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

void GameHandler(event3){

  currentNumber = getRandomNumber();  
  show("the current number is $currentNumber");
  
  for(int i = 0; i < 5; i++){
    
    
    for(int x = 0; x < 5; x++){
      
      if(computercard.fields[i][x] == currentNumber){
        
        document.query('#c$i$x').style.textDecoration = 'underline';
        document.query('#c$i$x').style.backgroundColor = 'red';
        
      }
      
    }
    
  }
  
  if(first){
    active = true;
    document.query('#getGamecard').on.click.remove(GamecardHandler);
    document.query('#startGame').value = "Next Number";
    first = false;
  }

}

int getRandomNumber(){
  
  int a = (Math.random()*100).toInt();
  
  while(a > 99 || a < 1 || (addNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
  
  addNumbers.add(a);
    
  return a;
}

void BingoHandler(event4){
  
  if(!active){
    
    show("You need to start the Game!");
  }
  else {
    
    
  }
  
}

