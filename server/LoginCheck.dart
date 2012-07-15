/**
 * Provides a simple Login check based on access data read from a txt file and http post data
 * 
 **/ 
#library("LoginCheck");
#import("dart:io");


  bool check(HttpRequest req){
  
    File file = new File("data.txt");
    
    bool valid = false;
    
    String heads = req.headers.toString();
    
    //print("heads $heads");
    
    bool exists = file.existsSync();
    
      if (exists) {
        
        //print("pass file exists");
        
        List<String> lines = file.readAsLinesSync();
        
        
        
        print("pass file read");
  
          if(!heads.contains("multiplayer.html")){
            
            print("retrieving postmessage");
             
            if(req.inputStream.read() != null){
                    
              String postmessage = new String.fromCharCodes(req.inputStream.read());
              
              print("postmessage $postmessage");
              
              postmessage = postmessage.replaceAll("username=", "");
              postmessage = postmessage.replaceAll("password=", "");
              
              if(postmessage.split("&").length > 1){
                
                String user = postmessage.split("&")[0];
                String pass = postmessage.split("&")[1];
                
                print("user: $user pass: $pass");
                
                for(String line in lines){
                  
                  if(line.split("=")[0] == user && line.split("=")[1] == pass){
                    
                    print("found login");
                    valid = true;
                    
                  }
                }
              }
              else {
                
                print("Error reading POST");
              }
    
          }
          else {
            valid = false;
          }
    
      }
      
      }
          
      return valid;
      }


