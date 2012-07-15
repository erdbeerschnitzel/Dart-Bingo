/**
 * Manages WebSocket messages
 * 
 **/

#library("MessageHandler");
#import("dart:io");
#import("dart:isolate");

class MessageHandler{
  

  List<WebSocketConnection> connections;
  List clients;
  List<int> addNumbers;
  
  Timer messageTimer;
  bool gameStarted = false;
  
  // standard constructor
  MessageHandler(){
    
    clients = new List();
    connections = new List<WebSocketConnection>();
    addNumbers = new List<int>();
  }
  
  void removeConnection(WebSocketConnection conn) {
    
    int index = connections.indexOf(conn);
    if (index > -1) {
      connections.removeRange(index, 1);
      clients.removeRange(index, 1);
    }
    
    if(clients.length < 1) {
      
      log("All Clients disconnected. Game stopped.");
      gameStarted = false;
      if(!(messageTimer == null))  messageTimer.cancel();
    }
    
    sendMessageToAllClients("Number of Players: ${(connections.length)}");
  }
  
  // send a message to all WebSocket clients
  void sendMessageToAllClients(String msg){
    
    connections.forEach((WebSocketConnection conn) {
      conn.send(msg);
    });  
  }

// check incoming WebSocket messages
void delegateMessage(String msg, WebSocketConnection originalconnection){
  
  log("Client sent message: $msg");
 
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
    
    clients.forEach((var client) {
      
      if(client.con == originalconnection) client.ready = true;
      
      if(client.ready) numberReady++;
    });
  }
  
  // handle client not ready
  if(msg.contains("client notready") && connections.length > 1){
    
    clients.forEach((var client) {
      
      if(client.con == originalconnection) {
        client.ready = false;
        log("client set status to not ready");
      }

    });
  
  }
  
  int numberReady = 0;
  
  clients.forEach((var client) {
    
    if(client.ready) numberReady++;
  });  
  
  sendMessageToAllClients("Number of Players: ${(connections.length)}   Players Ready: $numberReady");
  
  // when all clients are ready start the game
  if(numberReady == clients.length && numberReady > 1) {
    
    gameStarted = true;
    startTimer();
    log("Game started...");
    sendMessageToAllClients("All players are ready! Starting the Game!");
  }
  
  
  // handle bingo
  if(msg.contains("thisisbingo")) {
    
    gameStarted = false;
    messageTimer.cancel();
    sendMessageToAllClients("Player has Bingo. Game stopped.");
  }
  
}
  

  void timeHandler(timeevent) {
  
    if(gameStarted) sendMessageToAllClients("Number: ${getRandomNumber()}");
  
  }
  
  void startTimer(){
  
    messageTimer = new Timer.repeating(10000, timeHandler);
    
  }
  
  // get a random number between 1 and 99
  // no duplicates
  int getRandomNumber(){
    
    int a = (Math.random()*100).toInt();
    
    while(a > 99 || a < 1 || (addNumbers.indexOf(a) >= 0)) a = (Math.random()*100).toInt();
    
    addNumbers.add(a);
      
    return a;
  }
  
  
  // simple logging method printing time and msg
  void log(String msg){
    print("${new Date.now()}: $msg");  
  }



}