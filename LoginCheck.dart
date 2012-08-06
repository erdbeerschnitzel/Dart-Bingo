/**
 * Provides a simple Login check based on access data read from a txt file and http post data
 * 
 **/ 


 /**
  * check if login is valid via POST request body string 
  **/
  bool check(String body){
 
    bool valid = false;
    
    if(body != null){
                    
       String postmessage = body;
              
       //print("postmessage $postmessage");
              
       postmessage = postmessage.replaceAll("username=", "");
       postmessage = postmessage.replaceAll("password=", "");
              
       if(postmessage.split("&").length > 1){
                
         String user = postmessage.split("&")[0];
         String pass = postmessage.split("&")[1];
                  
         //print("user: $user pass: $pass");
                
         if(userExists(user, pass)) return true;
       }
   
    }
    else {
      log("Error reading POST in LoginCheck");
      valid = false;
    }

  }
  
  /**
   * checks if user exists
   * password is optional - if provided login is checked
   * 
   **/
  bool userExists(String user, [String password]){
    
    File file = new File("data.txt");
    
    bool exists = file.existsSync();
    
    if (exists) {
      
      //print("pass file exists");
      
      List<String> lines = file.readAsLinesSync();
      
      for(String line in lines){
        
        if(password != null){
          
          if(line.split("=")[0] == user && line.split("=")[1] == password){
            
            log("found login for $user");
            return  true;
            
          }
        }
        else {
          
          if(line.split("=")[0] == user){
            
            log("found user $user");
            return  true;
            
          }
        }

      }
  }
    
    return false;

  }
