#import('dart:html');
#source('Gamecard.dart');

Gamecard playercard;
Gamecard computercard;
int currentNumber = 22;
List<int> addNumbers;

void main() {
  
 addNumbers  = new List<int>(); 
 document.query('#getGamecard').on.click.add(GamecardHandler);
 
 document.query('#startGame').on.click.add(GameHandler);
  
 show('something');
}

void show(String message) {
  document.query('#status').innerHTML = message;
  
  
}

void GamecardHandler(event){
  
    show("clicked!");
  
    document.query('#playertable').innerHTML = createCard(playercard);
    
    addCellClickHandlers();

    document.query('#computertable').innerHTML = createCard(computercard);
}

String createCard(Gamecard card){
  
  card = new Gamecard();
  
  String cardstring = "";
  
  bool free = false;
  
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
            el.style.backgroundColor = 'white';
          }

        });         
      }
    }    
  }
}

void GameHandler(event3){
  
  document.query('#getGamecard').on.click.remove(GamecardHandler);
  currentNumber = getRandomNumber();  
  show("the current number is $currentNumber");

}

int getRandomNumber(){
  
  int a = (Math.random()*100).toInt();
  
  while(a > 99 || a < 1 || (addNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
    
  return a;
}
