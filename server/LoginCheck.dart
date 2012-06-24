
class LoginCheck {
  
  
  static bool check(HttpRequest req){
  
    File file = new File("data.txt");
    
    bool valid = false;
    
    String heads = req.headers.toString();
    
    file.exists().then((bool exists) {
      if (exists) {
        file.readAsLines().then((List<String> lines){
  
          if(!heads.contains("multiplayer.html")){
            
            String postmessage = new String.fromCharCodes(req.inputStream.read());
            
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
            valid = true;
          }
    
      });
      }
      
      return valid;
      }
    );
    }
}
