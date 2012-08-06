/**
 * Manages standard HTTP requests
 * 
 **/
#library("MessageHandler");

#import("dart:io");
#import("dart:isolate");

#import('HttpSessionManager.dart');
#source('LoginCheck.dart');
#source('Util.dart');

class RequestHandler {
  
  final int _MaxInactiveInterval = 60;
  HttpSessionManager _sessionManager;
  String _htmlResponse;
  HttpSession _session;
  String path;
  
  // standard constructor
  RequestHandler(){ 
    
    log("creating new request handler and sessionmanager");
    _sessionManager = new HttpSessionManager();
  }
  
 
  /**
   * main request handling method
   * delegates GET and POST to own methods and calls answerRequest()
   **/
  void handleRequest(HttpRequest req, HttpResponse resp) {
    
    //log("trying to handle ${req.method} request");
  
    _htmlResponse = "empty";
    
    if(req.method == "POST"){
    
      handlePOSTRequest(req, resp).then((result){
        log("POST handled for ${req.path}");
        answerRequest(req, resp);
        });
    }
    else {
      
      handleGETRequest(req, resp).then((result){
        log("GET handled for ${req.path} $result");
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
    
  
    if(_htmlResponse != "!File!"){
  
      resp.contentLength = _htmlResponse.splitChars().length;
      
      if(_htmlResponse == "empty") _htmlResponse = createErrorPage("Error occured");
  
      resp.outputStream.writeString(_htmlResponse);
    }
    else {
      
      if(readNonTextFile(req.path).length > 0 && _htmlResponse == "!File!") resp.outputStream.write(readNonTextFile(req.path));
     
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
          
          _session = _sessionManager.getSession(req, resp);
         
          if (_session != null){
         
            if (_session.isNew(_sessionManager.getSessions())){
              
              _session.setMaxInactiveInterval(_MaxInactiveInterval);
              
              log("new Session opened");
              
              _session.setAttribute("isNew", false);
  
              _htmlResponse = createLoginErrorPage();
            }
            
            else {

                if(_session.getAttribute("loggedin")){
                  
                  path = req.path; 
                  
                  if(path.endsWith('/') || path.endsWith('8080')) path = "html/index.html";
                  else path = ".${path}";
                  
                  
                  if(path.contains("main.html")) path = 'html/main.html';
       
                  _htmlResponse = createHtmlResponse(path);
                }
                else _htmlResponse = createLoginErrorPage();
       
            }
            
          }
          }
          // non-html files
          else {
            
            // logout
            if(req.path.endsWith("invalidate")){
              _session = _sessionManager.getSession(req, resp);
              _session.setAttribute("loggedin", false);
              _htmlResponse = createHtmlResponse("html/index.html");
            }
            else {
              
              if(req.path.contains('.png')) _htmlResponse = "!File!";
              else _htmlResponse = createHtmlResponse(".${req.path}");
            }

          }
      }
      // path = index.html
      else _htmlResponse = createHtmlResponse("html/index.html");
 
    } catch (Exception error) {
      
      _htmlResponse = createErrorPage(error.toString());
    }
    
    // assign final result
    result = _htmlResponse;
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
  
    _session = _sessionManager.getSession(req, resp);
    
    if (_session != null) if (_session.isNew(_sessionManager.getSessions())) _session.setMaxInactiveInterval(_MaxInactiveInterval);

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
        
       if(handleRegistration(bodyString)) _session.setAttribute("loggedin", true);
       
       else _session.setAttribute("loggedin", false);

      }
      // login
      else if (bodyString.contains("username=")){
        
        if(handleLogin(bodyString)) _session.setAttribute("loggedin", true);
        
        else _session.setAttribute("loggedin", false);

      }
      // complete the main completer
      maincompleter.complete(result);
    });
   
   // when completed assign htmlResponse to result 
   maincompleter.future.then((data) => result = _htmlResponse);
      
   return maincompleter.future; 
  
  }
  
  
  /**
   * handle login POST
   **/
  bool handleLogin(String body){
  
    log("Attempting login...");
   
    if(check(body)){
      _htmlResponse = createHtmlResponse("html/main.html");
      return true;
    }
    else _htmlResponse = createLoginErrorPage();
    
    return false;
  
    }
  
  
  
  /**
   * handle registration POST
   **/
  bool handleRegistration(String body){
    
    log("Registration started...");
    
    if(checkRegistrationParameters(body)){
      
      _htmlResponse = createHtmlResponse("html/main.html");
      return true;
    }
    else {
      log("Registration failed");
      return false;
    }
    
  }
 
}
