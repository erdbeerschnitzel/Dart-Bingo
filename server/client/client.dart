#import('dart:html');
#source('Gamecard.dart');

void main() {
  
  
 ButtonElement getGamecardButton = document.query('#getGamecard');
 
 getGamecardButton.on.click.add(GamecardHandler);
  
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
        
          
          if(x < 5 && i < 5)  card = card + '<td id="p' + i + x + '"' + 'class=top>' + playercard.fields[i][x] + '</td>';
          
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
    
    
    addClickHandlers();

}

void addClickHandlers(){
  
  for(int i = 0; i < 5; i++){
    
    
    for(int x = 0; x < 5; x++){
      
      if(i == 2 && x == 2){
        
      }
      else {
        
        TableCellElement el = document.query('#p$i$x');
        
        el.on.click.add((event2) {
          el.style.textDecoration = 'underline';
          el.style.backgroundColor = 'white';
        });         
      }
    }    
  }
}


