/**
 *  get a random number between 1 and 75
 *  no duplicates
 **/ 
class RandomNumberGenerator {
  
  List<int> addNumbers;
  
  RandomNumberGenerator(){
    
    addNumbers = new List<int>();
  }
  
  getRandomNumber(){
    
    int random = new Random().nextInt(75);
    
    while(random > 75 || random < 1 || (addNumbers.indexOf(random) >= 0)) random = new Random().nextInt(75);
    
    addNumbers.add(random);
    
    return random;
  }
  
}
