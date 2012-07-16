
// simple Class representing a Client consisting of a Websocket Connection a 
class Client {
  
  bool ready = false;
  WebSocketConnection con;
  Gamecard gamecard;
  
  Client();
  
  Client.start(WebSocketConnection this.con, bool this.ready);
  
}
