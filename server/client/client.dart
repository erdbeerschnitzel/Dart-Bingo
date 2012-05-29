#import('dart:html');
#source('Gamecard.dart');

void main() {
  
  
 ButtonElement getButton = document.query('#getGamecard');
 
 getButton.on.click.add(GamecardHandler);
  
 show('something');
}

void show(String message) {
  document.query('#status').innerHTML = message;
  
  
}

void GamecardHandler(event){
  
    show("clicked!");
    
    Gamecard playercard = new Gamecard();
    
    String card = "";
    
    bool free = false;
    
    int i = 0;
    int x = 0;
    
    for(List liste in playercard.fields){
      
      card = card + '<tr>';
      
      for(var value in liste){
        
          
          if(x < 5 && i < 5)  card = card + '<td id="p' + i + '.' + x + '"' + 'class=top>' + playercard.fields[i][x] + '</td>';
          
          if(x == 4){ 
            
            card = card + '</tr>';
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
    
    document.query('#playertable').innerHTML = card;
}
