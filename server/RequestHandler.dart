/**
 * Manages standard HTTP requests
 * 
 **/
#library("MessageHandler");
#import("dart:io");
#import("dart:isolate");
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
  
  //try {

    session = sessionManager.getSession(req, resp);
    
    if (session != null){
      
      if (session.isNew(sessionManager.getSessions())) session.setMaxInactiveInterval(MaxInactiveInterval);
    }
    
    if (session.isNew(sessionManager.getSessions()) ) {

      log("new Session opened");

      htmlResponse =  createLoginPage();
    }
    else {
      
      if(req.path.contains('.png')){
        
        handleOtherFile(req, resp);
        
      } else {
      
        handleTextFile(req, resp);
      
      }
      
    }
    
  //} catch (Exception err) {
    
   // htmlResponse = createErrorPage(err.toString());
  //}
  
  if(htmlResponse != "!File!")  resp.outputStream.writeString(htmlResponse);
  
  resp.outputStream.close();

}

void handleTextFile(HttpRequest req, HttpResponse resp){
  
  htmlResponse = createHtmlResponse(req);
 
  if(htmlResponse.contains("#EAEAEA")){
    
    //print("requesting css file");
    
    resp.headers.add("Content-Type", "text/css; charset=UTF-8");
  } 
  else {
      
    resp.headers.add("Content-Type", "text/html; charset=UTF-8");
  }
  
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
  

  
}
