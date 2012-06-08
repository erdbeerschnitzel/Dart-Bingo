#import('dart:io');
#source('client\\Client.dart');

List<WebSocketConnection> connections;
List<Client> clients;
List<int> addNumbers;
WebSocketHandler wsHandler;
bool gameStarted = false;
Time messageTimer;

void main() {
  
  connections = new List();
  clients = new List();
  addNumbers = new List();
  wsHandler = new WebSocketHandler();
  addWebSocketHandlers();
  

  HttpServer server = new HttpServer();
  server.addRequestHandler((HttpRequest req) => (req.path == "/bingo"), wsHandler.onRequest);
  server.addRequestHandler((_) => true, serveFile); 


  //startTimer();
  
  server.listen("127.0.0.1", 8080);  
  
  print("running..." + new Date.now().milliseconds);

}

// add Handlers to WebsocketConnectionHandler :)
void addWebSocketHandlers(){
  
  wsHandler.onOpen = (WebSocketConnection conn) {
    
    print("" + new Date.now() + ": Client connected...");
    conn.send("Hello from Server!");

    clients.add(new Client.bla(conn, false));
    
    connections.add(conn);    
    conn.onClosed = (a, b) => removeConnection(conn);
    conn.onError = (_) => removeConnection(conn);
    conn.onMessage = (msg) => delegateMessage(msg, conn);
  };
  
}

// check incoming messages
void delegateMessage(String msg, WebSocketConnection originalconnection){
  
  print("" + new Date.now() + ": Client sent message: $msg");
 
  // handle client connect
  if(msg.contains("client hello") && connections.length > 1) sendMessageToAllClients("Other Players: " + (connections.length - 1));
  
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
      
      if(client.con == originalconnection) client.ready = false;

    });
  
  }
  
  int numberReady = 0;
  
  clients.forEach((Client client) {
    
    if(client.ready) numberReady++;
  });  
  
  sendMessageToAllClients("Other Players: " + (connections.length - 1) + "   Players Ready: $numberReady");
  
  // when all clients are ready start the game
  if(numberReady == clients.length) {
    
    gameStarted = true;
    startTimer();
    print("" + new Date.now() + ": Game started...");
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

void startTimer(){

  messageTimer = new Timer.repeating(15000, (Timer t) {

    if(gameStarted) sendMessageToAllClients("Number: " + getRandomNumber());

  });
  
}

// serving http requests
void serveFile(HttpRequest req, HttpResponse resp) {
  
  String path = (req.path.endsWith('/')) ? ".${req.path}index.html" : ".${req.path}";
  print("requested $path");
  
  String heads = req.headers.toString();
  
  //login post
  if((path.contains("singleplayer.html") && req.method == "POST") || (path.contains("singleplayer.html") && heads.contains("multiplayer.html"))){
    
    print("matched");
    
    File file = new File("data.txt");
    
    file.exists().then((bool exists) {
      if (exists) {
        file.readAsLines().then((List<String> lines){
 
          bool valid = false;
       
          if(!heads.contains("multiplayer.html")){
            
            String postmessage = new String.fromCharCodes(req.inputStream.read());
            
            postmessage = postmessage.replaceAll("username=", "");
            postmessage = postmessage.replaceAll("password=", "");
            
            if(postmessage.split("&").length > 1){
              String user = postmessage.split("&")[0];
              String pass = postmessage.split("&")[1];
              
              print("user: $user pass: $pass");
              
              for(String line in lines){
                
                if(line.split("=")[0] == user && line.split("=")[1] == pass){
                  
                  print("found login");
                  valid = true;
                  
                }
              }
            }
            else {
              
              print("Error reading POST");
            }
    
          }
          else {
            valid = true;
          }
          
      
          if(valid){
            
            File client = new File("./client/singleplayer.html");
            
            resp.outputStream.writeString(client.readAsTextSync());
            resp.outputStream.close();

            
          } else {
            resp.outputStream.writeString("login denied");
            resp.outputStream.close();
          }
        });      
      } else {
        resp.outputStream.close();
      }
    });
    
    
  } else {
    
    if(!path.contains("singleplayer.html")){
  
    File file = new File(path);
    file.exists().then((bool exists) {
      if (exists) {
        file.readAsText().then((String text) {
          resp.outputStream.writeString(text);
          resp.outputStream.close();
        });      
      } else {
        resp.outputStream.close();
      }
    });
  
    }
    else {
      resp.outputStream.writeString("login denied");
      resp.outputStream.close();
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
    
    print("" + new Date.now() + ": All Clients disconnected. Game stopped.");
    gameStarted = false;
  }
  
  sendMessageToAllClients("Other Players: " + (connections.length - 1));
}