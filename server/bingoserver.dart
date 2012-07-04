/**
 * Server-side of Online-Bingo
 **/

// import Libs
#import('dart:io');
#import('dart:isolate');
#import('HttpSessionManager.dart', prefix:"hs");
#import('LoginCheck.dart');
#import('FileManager.dart', prefix:"FileManager");
// import normal source files
#source('Client.dart');
#source('Util.dart');


List<WebSocketConnection> connections;
List<Client> clients;
List<int> addNumbers;
WebSocketHandler wsHandler;
bool gameStarted = false;
var messageTimer;
final int MaxInactiveInterval = 60; // 

//
// ## main entry point ##
//
void main() {

  connections = new List();
  clients = new List();
  addNumbers = new List();
  wsHandler = new WebSocketHandler();
  addWebSocketHandlers();
  

  HttpServer server = new HttpServer();
  server.addRequestHandler((HttpRequest req) => (req.path == "/bingo"), wsHandler.onRequest);
  server.addRequestHandler((_) => true, requestHandler); 

  server.listen("127.0.0.1", 8080);  
  
  print("running... ${new Date.now()}");

}


// add Handlers to WebsocketConnectionHandler :)
void addWebSocketHandlers(){
  
  wsHandler.onOpen = (WebSocketConnection conn) {
    
    
    conn.send("Hello from Server!");

    clients.add(new Client.start(conn, false));
    print("${new Date.now()}: Client ${clients.length} connected...");
    connections.add(conn);    
    conn.onClosed = (a, b) => removeConnection(conn);
    conn.onError = (_) => removeConnection(conn);
    conn.onMessage = (msg) => delegateMessage(msg, conn);
  };
  
}

// check incoming WebSocket messages
void delegateMessage(String msg, WebSocketConnection originalconnection){
  
  print("${new Date.now()}: Client sent message: $msg");
 
  // handle client connect
  if(msg.contains("client hello") && connections.length > 1) sendMessageToAllClients("Other Players: ${(connections.length - 1)}");
  
  // handle single client ready 
  if(msg.contains("client ready") && connections.length == 1){
    
    connections[0].send("You need to wait for other players!");
    clients[0].ready = true;
  }

  // handle client ready
  if(msg.contains("client ready") && connections.length > 1){
    
    int numberReady = 0;
    
    clients.forEach((Client client) {
      
      if(client.con == originalconnection) client.ready = true;
      
      if(client.ready) numberReady++;
    });
  }
  
  // handle client not ready
  if(msg.contains("client notready") && connections.length > 1){
    
    clients.forEach((Client client) {
      
      if(client.con == originalconnection) {
        client.ready = false;
        print("client set to not ready");
      }

    });
  
  }
  
  int numberReady = 0;
  
  clients.forEach((Client client) {
    
    if(client.ready) numberReady++;
  });  
  
  sendMessageToAllClients("Number of Players: ${(connections.length)}   Players Ready: $numberReady");
  
  // when all clients are ready start the game
  if(numberReady == clients.length && numberReady > 1) {
    
    gameStarted = true;
    startTimer();
    print("${new Date.now()}: Game started...");
    sendMessageToAllClients("All players are ready! Starting the Game!");
  }
  
  
  // handle bingo
  if(msg.contains("thisisbingo")) {
    
    gameStarted = false;
    messageTimer.cancel();
    sendMessageToAllClients("Player has Bingo. Game stopped.");
  }
  
}

// send a message to all WebSocket clients
void sendMessageToAllClients(String msg){
  
  connections.forEach((WebSocketConnection conn) {
    conn.send(msg);
  });  
}

void timeHandler() {

  if(gameStarted) sendMessageToAllClients("Number: ${getRandomNumber()}");

}

void startTimer(){

  //messageTimer = new Timer.repeating(15000, timeHandler);
  
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
      
      print("png requested");
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

    print("new Session opened");

    return createLoginPage();
  }
  
  
  
  String path = (req.path.endsWith('/')) ? ".${req.path}index.html" : ".${req.path}";
  
  print("requested $path req.path: ${req.path}");
  
  
  if(req.path.endsWith('/') || req.path.endsWith('8080')){
    
    path = 'http:\\\\localhost:8080\client\singleplayer.html';
  }
  
  if(path.contains("singleplayer.html") && check(req)){
    
    File client = new File("./client/singleplayer.html");
    
    
    return client.readAsTextSync();
    
  }
  
  //login post
  if((path.contains("singleplayer.html") && req.method == "POST") || (path.contains("singleplayer.html") && req.headers.toString().contains("multiplayer.html"))){
    
    print("matched");
    
          if(check(req)){
            
            print("we are in");
            
            File client = new File("./client/singleplayer.html");
            
            return client.readAsTextSync();
            
          } else {
            
            print("login failed");
            return ("login denied");
          }
    
    
  } else {
    
    if(!path.contains("singleplayer.html")){
      
    print("requesting unrelated file");
  
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


void removeConnection(WebSocketConnection conn) {
  
  int index = connections.indexOf(conn);
  if (index > -1) {
    connections.removeRange(index, 1);
    clients.removeRange(index, 1);
  }
  
  if(clients.length < 1) {
    
    print("${new Date.now()}: All Clients disconnected. Game stopped.");
    gameStarted = false;
    if(!(messageTimer == null))  messageTimer.cancel();
  }
  
  sendMessageToAllClients("Number of Players: ${(connections.length)}");
}