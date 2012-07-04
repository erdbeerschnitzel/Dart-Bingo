/**
 * Manages File requests
 * 
 **/

#library("FileManager");
#import("dart:io");

List readNonTextFile(String path){
  
  print("requesting non text file $path");
  
  File file = new File(".$path");
  
  if(file != null){
    
    return file.readAsBytesSync();
  }
  else {
    
    return new List();
  }
  
}