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
  wsHandler.onOpen = (WebSocketConnection conn) {
    connections.add(conn);    
    conn.onClosed = (a, b) => removeConnection(conn);
    conn.onError = (_) => removeConnection(conn);
  };

  HttpServer server = new HttpServer();
  server.addRequestHandler((HttpRequest req) => (req.path == "/time"), wsHandler.onRequest);
  server.addRequestHandler((_) => true, serveFile); 

  
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
      print('not adding $time');
    }
  });
  
  server.listen("127.0.0.1", 8080);  
  
  print("file...");

  
  print("reading file...");

  
  doThis().then((b) => print('exists: $b'));


   print("after future");
}


Future doThis(){
  
  Completer c = new Completer();
  
  var a = 1;

    for(int i = 0; i < 100; i++){
      
      a = a + 1;
      
      for(int b = 0; b < 1000; b++){
        
        a = a - 1;
        
        for(int cc = 0; cc < 1000; cc++){
          
          a = a + 1;
        }
      }
    }
  c.complete("Wait for me: $a");

  return c.future; 
}

void serveFile(HttpRequest req, HttpResponse resp) {
  String path = (req.path.endsWith('/')) ? ".${req.path}index.html" : ".${req.path}";
  print("serving $path");
  
  if(path.contains("security_check")){
    
    print("matched");
    
    File file = new File("data.txt");
    file.exists().then((bool exists) {
      if (exists) {
        file.readAsLines().then((List<String> lines){
          //resp.headers.set(HttpHeaders.CONTENT_TYPE, getContentType(file));
          resp.outputStream.writeString("login denied");
          resp.outputStream.close();
        });      
      } else {
        resp.statusCode = HttpStatus.NOT_FOUND;
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
        resp.statusCode = HttpStatus.NOT_FOUND;
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