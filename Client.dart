part of bingoserver;
/**
 * simple Class representing a Client consisting of a Websocket Connection and a Gamecard object
 **/
class Client {

  bool ready = false;
  WebSocketConnection con;
  Gamecard gamecard;
  String username;

  Client();

  Client.start(WebSocketConnection this.con, bool this.ready);

}
