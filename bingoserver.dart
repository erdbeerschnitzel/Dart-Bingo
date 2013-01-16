/**
 * Server-side of Online-Bingo
 * no class - only main()
 **/
library bingoserver;
// import dart Libs
import 'dart:io';
import 'dart:isolate';
// import own libs
import 'RequestHandler.dart';
import 'MessageHandler.dart';
// import normal source files
part 'Client.dart';


WebSocketHandler websocketHandler;
MessageHandler messageHandler;
RequestHandler requestHandler;
bool gameStarted = false;

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
    conn.onMessage = (msg) => messageHandler.delegateMessage(msg, conn);
  };

}
