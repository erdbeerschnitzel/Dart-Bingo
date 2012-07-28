/**
*
* Utility methods
*
**/


String createPageFromHTMLFile(String path){

    File file = new File(path);
    
    if(file != null){
    
      //print("returning ${file.readAsTextSync()}");
      return file.readAsTextSync();
    }
    else {
      return  createErrorPage("Error reading file: $path");
    }

}


// create html for error page
String createErrorPage(String errorMessage) {
  
  return new StringBuffer('''
    <!DOCTYPE html>
    <html>
      <head>
        <title>Error Page</title>
      </head>
      <body>
        <h1> *** An Internal Error occured ***</h1><br>
        <p>Server error occured: ${cleanText(new StringBuffer(errorMessage)).toString()}</p><br>
      </body>
    </html>''').toString();
}

// create html for error page
String createLoginErrorPage() {
  
  return new StringBuffer('''
    <!DOCTYPE html>
    <html>
      <head>
        <title>Error Page</title>
      </head>
      <body>
        <h1> *** You are not logged in or your session expired! ***</h1><br>
        <div><a href='/index.html'>Go to Login Page</a></div>
      </body>
    </html>''').toString();
}

// escaping
StringBuffer cleanText(StringBuffer text) {
  
  var s = text.toString();
  text.clear(); 
  text = new StringBuffer();
  
  for (int i = 0; i < s.length; i++){
    
    if (s[i] == '&') text.add('&amp;');
    else if (s[i] == '"') text.add('&quot;');
    else if (s[i] == "'") text.add('&#39;');
    else if (s[i] == '<') text.add('&lt;');
    else if (s[i] == '>') text.add('&gt;');
    else text.add(s[i]);
  }
  
  return text;
}

// simple logging method printing time and msg
void log(String msg){
  print("${new Date.now()}: $msg");  
}

void logToFile(String msg){
  
  
  File file = new File('server.log');
  OutputStream out = file.openOutputStream(FileMode.APPEND);
  
  StringBuffer sb = new StringBuffer();
  
  sb.add("\n");
  sb.add("${new Date.now()}: ");
  sb.add(msg);
  
  out.writeString(sb.toString());
  out.close();
  
}
