class Gamecard {
  
  List<List> fields;
  
  List<int> addedNumbers;
  
  Gamecard(){
  
    fields = new List<List>();
    addedNumbers = new List<int>();
    
    for(int i = 0; i < 5; i++){
      
      fields.add(new List());      
            
      for(int x = 0; x < 5; x++){
        
        //create field in list
        fields[i].add(0);
        
        // middle of gamecard
        if(x == 2 && i == 2){
          
          fields[i][x] = "";
        }
        else {
          
          fields[i][x] = getRandomNumber();
          
          addedNumbers.add(fields[i][x]);
        }
      }
    }
  
  }
  
// very static
// TODO: improve card creating algo
String createCardHTML(bool forComputer){
  
  StringBuffer cardstring = new StringBuffer();
  
  int i = 0;
  int x = 0;
  
  // TODO: refactor for stuff
  for(List liste in fields){
    
    cardstring.add('<tr>');
    
    for(var value in liste){
      
        // this adds a td element with specific class and specific value
      if(forComputer){
        
        if(x < 5 && i < 5)  cardstring.add('<td id="c$i$x"class=top>${fields[i][x]}</td>');
      }
      else {
        
        if(x < 5 && i < 5)  cardstring.add('<td id="p$i$x"class=top>${fields[i][x]}</td>');
        
      }
        // close the tr element
        if(x == 4){ 
          
          cardstring.add('</tr>');
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
  
  return cardstring.toString();
}

//
bool checkBingo(){
  
  bool result = true;
  
  String deb = "";
  
// horizontal check
  for(int i = 0; i < 5; i++){
    
    result = true;
    
    for(int x = 0; x < 5; x++){
      
      if(i == 2 && x == 2){
      }
      else 
      {
      
        if(fields[i][x] > 0){

          result = false;
        }
        
        deb = "$deb$i$x: ${fields[i][x]} ";
      }
    }
      
    if(result) return result; 
 
    
  }
  
  // vertical check
  for(int i = 0; i < 5; i++){
    
    result = true;
    
    for(int x = 0; x < 5; x++){
      
      if(i == 2 && x == 2){
      }
      else 
      {
      
        if(fields[x][i] > 0){
          
          //debug("false: ${card.fields[i][x]}");
          result = false;
        }
        
        deb = "$deb$i$x: ${fields[i][x]} ";
      }
    }
      
    if(result) return result; 
 
    
  }  
  
  //debug(deb);
  
  return result;
}
  
  int getRandomNumber(){
    
    int a = (Math.random()*100).toInt();
    
    while(a > 99 || a < 1 || (addedNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
      
    return a;
  }
  
}
