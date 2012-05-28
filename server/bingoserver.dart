#import('dart:io');

Map<String, String> contentTypes = const {
  "html": "text/html; charset=UTF-8",
  "dart": "application/dart",
  "js": "application/javascript", 
};

List<WebSocketConnection> connections;


void main() {
  
  connections = new List();
  WebSocketHandler wsHandler = new WebSocketHandler();
  addWebSocketHandlers(wsHandler);
  

  HttpServer server = new HttpServer();
  server.addRequestHandler((HttpRequest req) => (req.path == "/bingo"), wsHandler.onRequest);
  server.addRequestHandler((_) => true, serveFile); 


  startTimer();
  
  server.listen("127.0.0.1", 8080);  
  
  print("running...");

}

void addWebSocketHandlers(WebSocketHandler wsHandler){
  
  wsHandler.onOpen = (WebSocketConnection conn) {
    connections.add(conn);    
    conn.onClosed = (a, b) => removeConnection(conn);
    conn.onError = (_) => removeConnection(conn);
  };

}

void startTimer(){
  
  List<int> done = new List<int>();
  
  new Timer.repeating(1000, (Timer t) {
    int time = (10*Math.random()).toInt();
    time = time.abs().toInt();
    
    if(!(done.indexOf(time)>-1)){
      done.add(time);
      print("adding $time");
      
      connections.forEach((WebSocketConnection conn) {
        conn.send(time.toString());
      });
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
  
  //login post
  if(path.contains("security_check")){
    
    print("matched");
    
    File file = new File("data.txt");
    
    file.exists().then((bool exists) {
      if (exists) {
        file.readAsLines().then((List<String> lines){
 
          bool valid = false;
       
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
          

          
          if(valid){

            
          } else {
            resp.outputStream.writeString("login denied");
            resp.outputStream.close();
          }
        });      
      } else {
        //resp.statusCode = HttpStatus.NOT_FOUND;
        resp.outputStream.close();
      }
    });
    
    
  } else {
  
    File file = new File(path);
    file.exists().then((bool exists) {
      if (exists) {
        file.readAsText().then((String text) {
          //resp.headers.set(HttpHeaders.CONTENT_TYPE, getContentType(file));
          resp.outputStream.writeString(text);
          resp.outputStream.close();
        });      
      } else {
        //resp.statusCode = HttpStatus.NOT_FOUND;
        resp.outputStream.close();
      }
    });
  
  }
}

String getContentType(File file) => contentTypes[file.name.split('.').last()];

void removeConnection(WebSocketConnection conn) {
  int index = connections.indexOf(conn);
  if (index > -1) {
    connections.removeRange(index, 1);
  }
}