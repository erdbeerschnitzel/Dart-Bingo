class Gamecard {
  
  List<List> fields;
  
  List<int> addedNumbers;
  
  Gamecard(){
  
    fields = new List<List>();
    addedNumbers = new List<int>();
    
    for(int i = 0; i < 5; i++){
      
      fields.add(new List());      
            
      for(int x = 0; x < 5; x++){
        
        fields[i].add(0);
        
        fields[i][x] = getRandomNumber();
          
        addedNumbers.add(fields[i][x]);

        

        
        if(x == 2 && i == 2){
          
          fields[i][x] = "free";
        }
      }
    }
  
  }
  
  
  int getRandomNumber(){
    
    int a = (Math.random()*100).toInt();
    
    while(a > 99 || a < 1 || (addedNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
      
    return a;
  }
  
}
