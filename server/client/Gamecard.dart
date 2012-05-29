class Gamecard {
  
  List<List> fields;
  
  Gamecard(){
  
    fields = new List<List>();
    
    for(int i = 0; i < 5; i++){
      
      fields.add(new List());      
            
      for(int x = 0; x < 5; x++){
        
        fields[i].add(0);
        
        fields[i][x] = getRandomNumber();
        
        if(x == 2 && i == 2){
          
          fields[i][x] = "free";
        }
      }
    }
  
  }
  
  
  int getRandomNumber(){
    
    var a = new Date.now().milliseconds / 100;
      
    return a.toInt();
  }
  
}
