#import('dart:io');
#source('client\\Client.dart');

List<WebSocketConnection> connections;
List<Client> clients;
WebSocketHandler wsHandler;

void main() {
  
  connections = new List();
  clients = new List();
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
 
  if(msg.contains("client hello") && connections.length > 1) sendMessageToAllClients("Other Players: " + (connections.length - 1));
  
  if(msg.contains("client ready") && connections.length == 1){
    
    connections[0].send("You need to wait for other players!");
    clients[0].ready = true;
  }

  if(msg.contains("client ready") && connections.length > 1){
    
    int numberReady = 0;
    
    clients.forEach((Client client) {
      
      if(client.con == originalconnection) client.ready = true;
      
      if(client.ready) numberReady++;
    });
    
    sendMessageToAllClients("Other Players: " + (connections.length - 1) + "   Players Ready: $numberReady");
  }
  
  if(msg.contains("client notready") && connections.length > 1){
    
    int numberReady = 0;
    
    clients.forEach((Client client) {
      
      if(client.con == originalconnection) client.ready = false;
      
      if(client.ready) numberReady++;
    });
    
    sendMessageToAllClients("Other Players: " + (connections.length - 1) + "   Players Ready: $numberReady");
  }
}

// send a message to all WebSocket clients
void sendMessageToAllClients(String msg){
  
  connections.forEach((WebSocketConnection conn) {
    conn.send(msg);
  });  
}

void startTimer(){
  
  List<int> done = new List<int>();
  
  new Timer.repeating(1000, (Timer t) {
    int time = (10*Math.random()).toInt();
    time = time.abs().toInt();
    
    if(!(done.indexOf(time)>-1)){
      done.add(time);
      print("adding $time");
      
      sendMessageToAllClients(time.toString());
    }
    else {
      //print('not adding $time');
    }
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

void removeConnection(WebSocketConnection conn) {
  int index = connections.indexOf(conn);
  if (index > -1) {
    connections.removeRange(index, 1);
  }
  
  sendMessageToAllClients("Other Players: " + (connections.length - 1));
}