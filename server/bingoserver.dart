/**
 * Server-side of Online-Bingo
 **/

// import Libs
#import('dart:io');
#import('dart:isolate');
#import('HttpSessionManager.dart', prefix:"hs");
#import('LoginCheck.dart');
#import('FileManager.dart', prefix:"FileManager");
#import('MessageHandler.dart');
// import normal source files
#source('Client.dart');
#source('Util.dart');

List<int> addNumbers;
WebSocketHandler wsHandler;
bool gameStarted = false;
Timer messageTimer;
final int MaxInactiveInterval = 60; // 
MessageHandler messageHandler;

//
// ## main entry point ##
//
void main() {

  addNumbers = new List();
  wsHandler = new WebSocketHandler();
  messageHandler = new MessageHandler();
  addWebSocketHandlers();
  
  HttpServer server = new HttpServer();
  server.addRequestHandler((HttpRequest req) => (req.path == "/bingo"), wsHandler.onRequest);
  server.addRequestHandler((_) => true, requestHandler); 

  server.listen("127.0.0.1", 8080);  
  
  log("Server running...");

}


// add Handlers to WebsocketConnectionHandler :)
void addWebSocketHandlers(){
  
  wsHandler.onOpen = (WebSocketConnection conn) {
    
    conn.send("Hello from Server!");

    messageHandler.clients.add(new Client.start(conn, false));
    
    log("Client ${messageHandler.clients.length} connected...");
    
    messageHandler.connections.add(conn);    
    
    conn.onClosed = (a, b) => messageHandler.removeConnection(conn);
    conn.onError = (_) => messageHandler.removeConnection(conn);
    conn.onMessage = (msg) => messageHandler.delegateMessage(msg, conn);
  };
  
}


// serving http requests
void requestHandler(HttpRequest req, HttpResponse resp) {
  
  String htmlResponse;
  
  if(req.path.contains('.png')){
    
    try {

      hs.HttpSession session = hs.getSession(req, resp);
      
      if (session != null){
        
        if (session.isNew(hs.getSessions())) session.setMaxInactiveInterval(MaxInactiveInterval);
      }

      
      if(FileManager.readNonTextFile(req.path).length == 0){
        
        htmlResponse = createErrorPage("error reading file: ${req.path}");
      }
      htmlResponse = createHtmlResponse(req, session);
      
      //print("response: ${htmlResponse}");
      
    } catch (Exception err) {
      
      htmlResponse = createErrorPage(err.toString());
    }
    
    if(FileManager.readNonTextFile(req.path).length != 0) resp.outputStream.write(FileManager.readNonTextFile(req.path));
    
  } else {
  
  try {

    hs.HttpSession session = hs.getSession(req, resp);
    
    if (session != null){
      
      if (session.isNew(hs.getSessions())) session.setMaxInactiveInterval(MaxInactiveInterval);
    }


    
    htmlResponse = createHtmlResponse(req, session);
    
    //print("response: ${htmlResponse}");
    
  } catch (Exception err) {
    
    htmlResponse = createErrorPage(err.toString());
  }
  
  
  if(htmlResponse.contains("#EAEAEA")){
    
    //print("requesting css file");
    
    resp.headers.add("Content-Type", "text/css; charset=UTF-8");
  } 
  else {
    
    if(req.path.contains('.png')){
      
      log("png requested");
      resp.headers.add("Content-Type", "text/html; charset=UTF-8");
      //resp.headers.add("Content-Type", "image/png; charset=UTF-8");
    } 
    else {
      
      resp.headers.add("Content-Type", "text/html; charset=UTF-8");
    }
   
    
  }

  resp.outputStream.writeString(htmlResponse);
  
  }

  
  resp.outputStream.close();

 
}



// Create HTML response to the request.
String createHtmlResponse(HttpRequest req, hs.HttpSession session) {
  
  if (session.isNew(hs.getSessions()) ) {

    log("new Session opened");

    return createLoginPage();
  }
  
  
  
  String path = (req.path.endsWith('/')) ? ".${req.path}index.html" : ".${req.path}";
  
  log("requested $path req.path: ${req.path}");
  
  
  if(req.path.endsWith('/') || req.path.endsWith('8080')){
    
    path = 'http:\\\\localhost:8080\client\singleplayer.html';
  }
  
  if(path.contains("singleplayer.html") && check(req))  return FileManager.readHTMLFile();
    
  //login post
  if((path.contains("singleplayer.html") && req.method == "POST") || (path.contains("singleplayer.html") && req.headers.toString().contains("multiplayer.html"))){
    
    log("matched");
    
          if(check(req)){
            
            log("we are in");
            
            File client = new File("./client/singleplayer.html");
            
            return client.readAsTextSync();
            
          } else {
            
            log("login failed");
            return ("login denied");
          }
    
    
  } else {
    
    if(!path.contains("singleplayer.html")){
      
    log("requesting unrelated file");
  
    File file = new File(path);
  
    if(file != null){

      return file.readAsTextSync();
    
      } else {
        return createErrorPage("Internal error reading User DB!");
      }
  
    }
    else {
      
      return createErrorPage("Login denied!");
    }
  }
  
}


// get a random number between 1 and 99
// no duplicates
int getRandomNumber(){
  
  int a = (Math.random()*100).toInt();
  
  while(a > 99 || a < 1 || (addNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
  
  addNumbers.add(a);
    
  return a;
}




