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
  
  log("trying to handle ${req.method} request");
  
  if(req.method == "POST"){

    
    handlePOSTRequest(req, resp);
  }
  else {
    
    handleGETRequest(req, resp);
  }
  
  
  
  //setCookieParameter(resp, "testName", "TestValue_\u221A2=1.41", req.path);
 
  if(htmlResponse != "!File!") resp.outputStream.writeString(htmlResponse);
  
  resp.outputStream.close();
}

void handleGETRequest(HttpRequest req, HttpResponse resp){
  
  try {

    session = sessionManager.getSession(req, resp);
   
    if (session != null){
   
      if (session.isNew(sessionManager.getSessions())){
        
        
        session.setMaxInactiveInterval(MaxInactiveInterval);
        log("new Session opened");

        htmlResponse = createPageFromHTMLFile("index.html");
      }
      else {
        
        if(req.path.contains('.png')){
          
          handleOtherFile(req, resp);
          
        } else {
   
          handleTextFile(req, resp);
        
        }
      }
      
    }
 
    
  } catch (Exception err) {
    
    htmlResponse = createErrorPage(err.toString());
  }
}

void handlePOSTRequest(HttpRequest req, HttpResponse resp){
  
  session = sessionManager.getSession(req, resp);
  
  if (session != null){
    
    if (session.isNew(sessionManager.getSessions())) session.setMaxInactiveInterval(MaxInactiveInterval);
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
    if(bodyString.contains("repeatpassword")){
      handleRegistration();
    }
    else if (bodyString.contains("username=")){
      handleLogin(req, resp);
    }
  });
  
  

}


void handleLogin(HttpRequest req, HttpResponse resp){

  log("Attempting login...");
 
  if(check(req)) htmlResponse = createPageFromHTMLFile("main.html");
  else htmlResponse = createLoginErrorPage();

  resp.headers.add("Content-Type", "text/html; charset=UTF-8");
  
}


void handleRegistration(){
  
  log("Registration started...");
}

void handleTextFile(HttpRequest req, HttpResponse resp){
  
  htmlResponse = createHtmlResponse(req);

  if(htmlResponse.contains("#EAEAEA") || htmlResponse.contains('#FFC6A5')){
    
    //print("requesting css file");
    
    resp.headers.add("Content-Type", "text/css; charset=UTF-8");
  } 
  else {
      
    resp.headers.add("Content-Type", "text/html; charset=UTF-8");
  }
  
}

void handleTextFileWithoutRequest(HttpResponse resp){
  

  
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



// Create HTML response to the request.
String createHtmlResponse(HttpRequest req) {

  String path = (req.path.endsWith('/')) ? ".${req.path}index.html" : ".${req.path}";
  
  log("requested $path req.path: ${req.path}");
  
  
  if(req.path.endsWith('/') || req.path.endsWith('8080')){
    
    path = 'http:\\\\localhost:8080\\main.html';
  }
  
  if(path.contains("singleplayer.html") && check(req))  return FileManager.readHTMLFile();
    
  
    if(!path.contains("singleplayer.html")){
      
    //log("requesting unrelated file");
  
    File file = new File(path);
  
    if(file != null){

      return file.readAsTextSync();
    
      } else {
        return createErrorPage("Internal error reading User DB!");
      }
  
    }
    else {
      
      return createLoginErrorPage();
    }
  }
  

void setCookieParameter(HttpResponse response, String name, String value, [String path = null]) {
  log("setting cookie parameters for response");
  
  if (path == null) response.headers.add("Set-Cookie",  "${uri.encodeUriComponent(name)}=${uri.encodeUriComponent(value)}");
  else response.headers.add("Set-Cookie",  "${uri.encodeUriComponent(name)}=${uri.encodeUriComponent(value)};Path=${path}");
  
}
   
  // Get cookie parameters from the request
Map getCookieParameters(HttpRequest request) {
  
  String cookieHeader = request.headers.value("Cookie");
  if (cookieHeader == null) return null; // no Session header included
  return _splitHeaderString(cookieHeader);
}
  
  // Split cookie header string.
  // "," separation is used for cookies in a single set-cookie folded header
  // ";" separation is used for cookies sent by multiple set-cookie headers
  Map<String, String> _splitHeaderString(String cookieString) {
    
    
  Map<String, String> result = new Map<String, String>();
  int currentPosition = 0;
  int position0;
  int position1;
  int position2;
  while (currentPosition < cookieString.length) {
  int position = cookieString.indexOf("=", currentPosition);
  if (position == -1) {
  break;
  }
  String name = cookieString.substring(currentPosition, position);
  currentPosition = position + 1;
  position1 = cookieString.indexOf(";", currentPosition);
  position2 = cookieString.indexOf(",", currentPosition);
  String value;
  if (position1 == -1 && position2 == -1) {
  value = cookieString.substring(currentPosition);
  currentPosition = cookieString.length;
  } else {
  if (position1 == -1) position0 = position2;
  else if (position2 == -1) position0 = position1;
  else if (position1 < position2) position0 = position1;
  else position0 = position2;
  value = cookieString.substring(currentPosition, position0);
  currentPosition = position0 + 1;
  }
  result[uri.decodeUriComponent(name.trim())] = uri.decodeUriComponent(value.trim());
  }
  return result;
  }
}
