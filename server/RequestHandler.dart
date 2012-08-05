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
  
      resp.contentLength = htmlResponse.splitChars().length;
  
      resp.outputStream.writeString(htmlResponse);
    }
    else {
      
      if(FileManager.readNonTextFile(req.path).length > 0 && htmlResponse == "!File!") resp.outputStream.write(FileManager.readNonTextFile(req.path));
     
      else resp.outputStream.writeString("error reading file: ${req.path}");
 
    }
  
    resp.outputStream.close();
  }
  
  
  /**
   * handle GET requests async
   **/ 
  Future handleGETRequest(HttpRequest req, HttpResponse resp){
    
    Completer maincompleter = new Completer();
    
    String result = "emptyResponse";
    
    try {
      
      // path != index.html
      if(!req.path.contains("index.html")){
        
        // only html files
        if(req.path.endsWith("html")){
          
          session = sessionManager.getSession(req, resp);
         
          if (session != null){
         
            if (session.isNew(sessionManager.getSessions())){
              
              session.setMaxInactiveInterval(MaxInactiveInterval);
              
              log("new Session opened");
              
              session.setAttribute("isNew", false);
  
              htmlResponse = createLoginErrorPage();
            }
            
            else {
                             
                // if logged in
                if(session.getAttribute("loggedin")) handleTextFile(req, resp);

                // not logged in
                else {
                  
                  if(req.path != "/index.html") htmlResponse = createLoginErrorPage();
                  else htmlResponse = createPageFromHTMLFile("index.html");
                }
       
            }
            
          }
          }
          // non-html files
          else {
            
            if(req.path.contains('.png')) htmlResponse = "!File!";
            else handleTextFile(req, resp);
          }
      }
      // path = index.html
      else htmlResponse = createPageFromHTMLFile("index.html");
 
    } catch (Exception err) {
      
      htmlResponse = createErrorPage(err.toString());
    }
    
    result = htmlResponse;
    maincompleter.complete(result);  
  
    return maincompleter.future; 
  }
  
  /**
   * handle POST Request async
   **/
  Future handlePOSTRequest(HttpRequest req, HttpResponse resp){
    
    Completer maincompleter = new Completer();
    
    String result = "emptyPOSTResponse";
  
    session = sessionManager.getSession(req, resp);
    
    if (session != null) if (session.isNew(sessionManager.getSessions())) session.setMaxInactiveInterval(MaxInactiveInterval);

    else log("session was null");

  
    String bodyString = ""; 
    Completer completer = new Completer();
    
    // async read from request.inputstream
    StringInputStream strins = new StringInputStream(req.inputStream, Encoding.UTF_8);
   
    strins.onData = (() => bodyString = bodyString.concat(strins.read()));
    
    strins.onClosed = (() => completer.complete("body data received"));
    
    strins.onError = ((Exception e) => print('exeption occured : ${e.toString()}'));

    
    
    // process the request and send a response
    completer.future.then((data){
      
      result = "2";
      
      // registration
      if(bodyString.contains("repeatpassword")){
        
       if(handleRegistration(bodyString)) session.setAttribute("loggedin", true);
       
       else session.setAttribute("loggedin", false);

      }
      // login
      else if (bodyString.contains("username=")){
        
        if(handleLogin(bodyString)) session.setAttribute("loggedin", true);
        
        else session.setAttribute("loggedin", false);

      }
      // complete
      maincompleter.complete(result);
    });
   
   // when complete assign htmlResponse to result 
   maincompleter.future.then((data) => result = htmlResponse);
      
   return maincompleter.future; 
  
  }
  
  /**
   * handle login POST
   **/
  bool handleLogin(String body){
  
    log("Attempting login...");
   
    if(check(body)){
      htmlResponse = createPageFromHTMLFile("main.html");
      return true;
    }
    else htmlResponse = createLoginErrorPage();
    
    return false;
  
    }
  
  
  /**
   * handle registration POST
   **/
  bool handleRegistration(String body){
    
    log("Registration started...");
    
    if(checkRegistrationParameters(body)){
      
      htmlResponse = createPageFromHTMLFile("main.html");
      return true;
    }
    else {
      log("Registration failed");
      return false;
    }
    
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
  
  void handleTextFile(HttpRequest req, HttpResponse resp){
    
    htmlResponse = createHtmlResponse(req);
  
    if(req.path.endsWith(".css")) resp.headers.add("Content-Type", "text/css; charset=UTF-8");
  
    else resp.headers.add("Content-Type", "text/html; charset=UTF-8");
  
  }

  
}
