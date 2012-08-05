/**
 * Server-side of Online-Bingo
 * no class - only main()
 **/

// import dart Libs
#import('dart:io');
#import('dart:isolate');
// import own libs
#import('MessageHandler.dart');
#import('RequestHandler.dart');
// import normal source files
#source('Client.dart');


WebSocketHandler websocketHandler;
bool gameStarted = false;

final int MaxInactiveInterval = 60; // 
MessageHandler messageHandler;
RequestHandler requestHandler;




//
// ## main entry point ##
//
void main() {
 
  websocketHandler = new WebSocketHandler();
  messageHandler = new MessageHandler();
  requestHandler = new RequestHandler();
  
  addWebSocketHandlers();

  HttpServer server = new HttpServer();
  server.addRequestHandler((HttpRequest req) => (req.path == "/bingo"), websocketHandler.onRequest);
  server.addRequestHandler((_) => true, requestHandler.handleRequest); 
  server.onError = (e) => log(e);
  
  server.listen("127.0.0.1", 8080);  
  
  log("Server running...");
  logToFile("Server running...");

}


// add Handlers to WebsocketConnectionHandler :)
void addWebSocketHandlers(){
  
  websocketHandler.onOpen = (WebSocketConnection conn) {
    
    conn.send("Hello from Server!");

    
    messageHandler.clients.add(new Client.start(conn, false));
    
    log("Client ${messageHandler.clients.length} connected...");
    logToFile("Client ${messageHandler.clients.length} connected...");
    
    messageHandler.connections.add(conn);    
    
    conn.onClosed = (a, b) => messageHandler.removeConnection(conn);
    conn.onError = (_) => messageHandler.removeConnection(conn);
    conn.onMessage = (msg) => messageHandler.delegateMessage(msg, conn);
  };
  
}
