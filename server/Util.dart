/**
*
* Utility methods
*
**/


String createPageFromHTMLFile(String path){

    File file = new File(path);
    
    if(file != null){
    
      //print("returning ${file.readAsTextSync()}");
      return file.readAsTextSync();
    }
    else {
      return  createErrorPage("Error reading file: $path");
    }

}


// create html for error page
String createErrorPage(String errorMessage) {
  
  return new StringBuffer('''
    <!DOCTYPE html>
    <html>
      <head>
        <title>Error Page</title>
      </head>
      <body>
        <h1> *** An Internal Error occured ***</h1><br>
        <p>Server error occured: ${cleanText(new StringBuffer(errorMessage)).toString()}</p><br>
      </body>
    </html>''').toString();
}

// create html for error page
String createLoginErrorPage() {
  
  return new StringBuffer('''
    <!DOCTYPE html>
    <html>
      <head>
        <title>Error Page</title>
      </head>
      <body>
        <h1> *** You are not logged in or your session expired! ***</h1><br>
        <div><a href='/index.html'>Go to Login Page</a></div>
      </body>
    </html>''').toString();
}

// Create HTML response to the request.
String createHtmlResponse(HttpRequest req) {

  String path = (req.path.endsWith('/')) ? ".${req.path}index.html" : ".${req.path}";
  
  //log("requested $path req.path: ${req.path}");
  
  
  if(req.path.endsWith('/') || req.path.endsWith('8080')){
    
    path = 'main.html';
  }

    File file = new File(path);
  
    if(file != null){

      return file.readAsTextSync();
    
      } else {
        return createErrorPage("Internal error reading User DB!");
      }
  
    
  }

String returnStringIfInList(String string, List list){
  
  for(int i = 0; i < list.length; i++){
    
    if(list[i].startsWith(string)) return list[i].replaceFirst(string, "");
  }
  
  return "";
}


/**
 * check registration parameters of POST request
 * if valid and user doesn't exist persist username and password
 **/
bool checkRegistrationParameters(String body){
  
  bool result = true;
  
  List split = body.split("&");

  // something wrong with parameters
  if(split.length < 5) return false;
  // parameters seem ok
  else {
    
    String username = returnStringIfInList("username=", split);
    String password = returnStringIfInList("password=", split);
    String repeatpassword = returnStringIfInList("repeatpassword=", split);
    String age = returnStringIfInList("age=", split);
    String email = returnStringIfInList("email=", split);
    
    if(username != "" && password != "" && repeatpassword != "" && age != "" && email != ""){
      
      if(!userExists(username)){
        
        if(password == repeatpassword){
          
          File file = new File("data.txt");
          
            if (file.existsSync()) {
              
              OutputStream out = file.openOutputStream(FileMode.APPEND);

              out.writeString("\r\n$username=$password");
              out.close();
              
              log("Registration of username $username successful!");
              
            }
        }
        else {
          
          return false;
        }
      }
      // user exists
      else {
        log("Registration failed - user already exists.");
        return false;
      }
      

    }
    else {
      return false;
    }
  }

  return result;
  
}


// escaping
StringBuffer cleanText(StringBuffer text) {
  
  String s = text.toString();
  text.clear(); 
  text = new StringBuffer();
  
  for (int i = 0; i < s.length; i++){
    
    if (s[i] == '&') text.add('&amp;');
    else if (s[i] == '"') text.add('&quot;');
    else if (s[i] == "'") text.add('&#39;');
    else if (s[i] == '<') text.add('&lt;');
    else if (s[i] == '>') text.add('&gt;');
    else text.add(s[i]);
  }
  
  return text;
}

// simple logging method printing time and msg
void log(var msg) => print("${new Date.now()}: $msg");  

// log to file server.log
void logToFile(String msg){
  
  File file = new File('server.log');
  OutputStream out = file.openOutputStream(FileMode.APPEND);
  
  out.writeString("\r\n${new Date.now()}: $msg");
  out.close();
  
}
