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
  
 
  /**
   * main request handling method
   * delegates GET and POST to own methods and calls answerRequest()
   **/
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
  
  /**
   * answer request by writing to response outputstream
   * set content type and content length
   **/
  void answerRequest(HttpRequest req, HttpResponse resp){
    
    //log("response: $htmlResponse");
    
    if(req.path.endsWith(".css")) resp.headers.add("Content-Type", "text/css; charset=UTF-8");
    
    else resp.headers.add("Content-Type", "text/html; charset=UTF-8");
    
  
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
    
    // future standard result
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

                if(session.getAttribute("loggedin")) htmlResponse = createHtmlResponse(req);

                else htmlResponse = createLoginErrorPage();
       
            }
            
          }
          }
          // non-html files
          else {
            
            if(req.path.contains('.png')) htmlResponse = "!File!";
            else htmlResponse = createHtmlResponse(req);
          }
      }
      // path = index.html
      else htmlResponse = createPageFromHTMLFile("index.html");
 
    } catch (Exception error) {
      
      htmlResponse = createErrorPage(error.toString());
    }
    
    // assign final result
    result = htmlResponse;
    maincompleter.complete(result);  
  
    return maincompleter.future; 
  }
  
  /**
   * handle POST Request async
   **/
  Future handlePOSTRequest(HttpRequest req, HttpResponse resp){
    
    // main completer for this future
    Completer maincompleter = new Completer();
    
    // standard future result
    String result = "emptyPOSTResponse";
  
    session = sessionManager.getSession(req, resp);
    
    if (session != null) if (session.isNew(sessionManager.getSessions())) session.setMaxInactiveInterval(MaxInactiveInterval);

    else log("session was null");

  
    String bodyString = ""; 
    
    // completer for request parameter reading
    Completer completer = new Completer();
    
    // async read from request.inputstream
    StringInputStream strins = new StringInputStream(req.inputStream, Encoding.UTF_8);
   
    // handler for incoming data
    strins.onData = (() => bodyString = bodyString.concat(strins.read()));
    // handler for read finish
    strins.onClosed = (() => completer.complete("body data received"));
    // handler for error
    strins.onError = ((Exception e) => print('exeption occured : ${e.toString()}'));


    // process the request and set htmlResponse
    completer.future.then((data){
      
      // debug
      result = "emptyInnerPOSTResponse";
      
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
      // complete the main completer
      maincompleter.complete(result);
    });
   
   // when completed assign htmlResponse to result 
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
 
}
