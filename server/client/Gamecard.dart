class Gamecard {
  
  List<List> fields;
  
  Gamecard(){
  
    fields = new List<List>();
  
  }
  
  
  int getRandomNumber(){
    
    var a = new Date().milliseconds / 100;
    
    return a.toInt();
  }
  
}
