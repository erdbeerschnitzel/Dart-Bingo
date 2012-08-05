/**
 * Manages standard HTTP requests
 * 
 **/
#library("MessageHandler");
#import("dart:io");
#import("dart:isolate");
#import("dart:uri", prefix:"uri");
#import('HttpSessionManager.dart');
#import('FileManager.dart', prefix:"FileManager");
#import('LoginCheck.dart');
#source('Util.dart');

class RequestHandler {
  
  final int MaxInactiveInterval = 60; // 
  HttpSessionManager sessionManager;
  String htmlResponse;
  HttpSession session;
  
  // standard constructor
  RequestHandler(){ 
    
    log("creating new request handler and sessionmanager");
    sessionManager = new HttpSessionManager();
  }
  
 
// serving http requests
void handleRequest(HttpRequest req, HttpResponse resp) {
  
  //log("trying to handle ${req.method} request");

  htmlResponse = "empty";
  
  if(req.method == "POST"){
  
    handlePOSTRequest(req, resp).then((result){
      log("POST handeld for ${req.path}");
      answerRequest(req, resp);
      });
  }
  else {
    
    handleGETRequest(req, resp).then((result){
      log("GET handeld for ${req.path}");
      answerRequest(req, resp);
      });
  }
  
  

}

void answerRequest(HttpRequest req, HttpResponse resp){
  
  //log("response: $htmlResponse");

  if(htmlResponse != "!File!"){
    
    //log("writing response $htmlResponse");
    resp.contentLength =htmlResponse.splitChars().length;

    resp.outputStream.writeString(htmlResponse);
  }

  resp.outputStream.close();
}

Future handleGETRequest(HttpRequest req, HttpResponse resp){
  
  Completer maincompleter = new Completer();
  
  var result = "emptyResponse";
  
  try {
    
    if(!req.path.contains("index.html")){
      
      if(!req.path.endsWith(".css") && !req.path.endsWith(".js") && !req.path.contains('.png')){
        
        session = sessionManager.getSession(req, resp);
       
        if (session != null){
       
          if (session.isNew(sessionManager.getSessions())){
            
            session.setMaxInactiveInterval(MaxInactiveInterval);
            
            log("new Session opened");
            
            session.setAttribute("isNew", false);

            htmlResponse = createLoginErrorPage();
          }
          
          else {
            
            if(session.getAttribute("loggedin") != null){
              
              if(session.getAttribute("loggedin") == true){
                
                if(req.path.contains('.png')){
                  
                  handleOtherFile(req, resp);
                  
                } else {
           
                  handleTextFile(req, resp);
                
                }
              } 
              else {
                
                if(req.path != "/index.html") htmlResponse = createLoginErrorPage();
                else htmlResponse = createPageFromHTMLFile("index.html");
              }
            }       
          }
          
        }
        }
        else {
          
          if(req.path.contains('.png')){
            
            handleOtherFile(req, resp);
            
          } else {
     
            handleTextFile(req, resp);
          
          }
        }
    }
    else {
      htmlResponse = createPageFromHTMLFile("index.html");
    }


 
    
  } catch (Exception err) {
    
    htmlResponse = createErrorPage(err.toString());
  }
  
  result = htmlResponse;
  maincompleter.complete(result);  

  return maincompleter.future; 
}

Future handlePOSTRequest(HttpRequest req, HttpResponse resp){
  
  Completer maincompleter = new Completer();
  
  var result = "emptyPOSTResponse";
  
  
  session = sessionManager.getSession(req, resp);
  
  if (session != null){
    
    if (session.isNew(sessionManager.getSessions())) session.setMaxInactiveInterval(MaxInactiveInterval);
  }
  else {
    log("session was null");
  }


  String bodyString = ""; 
  var completer = new Completer();
  
  var strins = new StringInputStream(req.inputStream, Encoding.UTF_8);
  
  strins.onData = (){
    bodyString = bodyString.concat(strins.read());
  };
  strins.onClosed = () {
    completer.complete("body data received");
  };
  strins.onError = (Exception e) {
    print('exeption occured : ${e.toString()}');
  };
  
  
  // process the request and send a response
  completer.future.then((data){
    
    result = 2;
    
    if(bodyString.contains("repeatpassword")){
      
     if(handleRegistration(req, resp, bodyString)) session.setAttribute("loggedin", true);
     
     else session.setAttribute("loggedin", false);
      maincompleter.complete(result);
    }
    else if (bodyString.contains("username=")){
      
      if(handleLogin(req, resp, bodyString)) session.setAttribute("loggedin", true);
      
      else session.setAttribute("loggedin", false);
      
      maincompleter.complete(result); 
      
    }
  });
  
  
  maincompleter.future.then((data) => result = htmlResponse);
    
  return maincompleter.future; 

}


bool handleLogin(HttpRequest req, HttpResponse resp, String body){

  log("Attempting login...");
 
  if(check(req, body)){
    htmlResponse = createPageFromHTMLFile("main.html");
    return true;
  }
  else htmlResponse = createLoginErrorPage();
  
  return false;

  }


bool handleRegistration(HttpRequest req, HttpResponse resp, String body){
  
  log("Registration started...");
  
  if(checkRegistrationParameters(req, body)){
    
    htmlResponse = createPageFromHTMLFile("main.html");
    return true;
  }
  else {
    log("Registration failed");
    return false;
  }
  
}

bool checkRegistrationParameters(HttpRequest req, String body){
  
  bool result = true;
  
  List split = body.split("&");

  if(split.length < 5){
    return false;
  }
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



void handleTextFile(HttpRequest req, HttpResponse resp){
  
  htmlResponse = createHtmlResponse(req);

  if(req.path.endsWith(".css")) resp.headers.add("Content-Type", "text/css; charset=UTF-8");

  else resp.headers.add("Content-Type", "text/html; charset=UTF-8");

}

void handleOtherFile(HttpRequest req, HttpResponse resp){
  
  
  if(FileManager.readNonTextFile(req.path).length == 0){
    
    htmlResponse = createErrorPage("error reading file: ${req.path}");
  }
  else {
    
    htmlResponse = "!File!";
    resp.outputStream.write(FileManager.readNonTextFile(req.path));
  }
}




  
}
