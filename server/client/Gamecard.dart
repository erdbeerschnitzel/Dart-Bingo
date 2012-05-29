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
        
        int temp = 101;
        
        while(temp > 99 || temp < 1 || (addedNumbers.indexOf(temp) >= 0)) temp = getRandomNumber();
        
        fields[i][x] = temp;
          
        addedNumbers.add(temp);

        

        
        if(x == 2 && i == 2){
          
          fields[i][x] = "free";
        }
      }
    }
  
  }
  
  
  int getRandomNumber(){
    
    var a = (Math.random()*100).toInt();
      
    return a.toInt();
  }
  
}
