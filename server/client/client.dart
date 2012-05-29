#import('dart:html');

void main() {
  
  
 ButtonElement getButton =  document.query('#getGamecard');
 
 getButton.on.click.add(GamecardHandler);
  
 show('something');
}

void show(String message) {
  document.query('#status').innerHTML = message;
  
  
}

void GamecardHandler(event){
  
    show("clicked!");
}
