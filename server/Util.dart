/**
*
* Utility methods
*
**/


String createLoginPage(){

    File file = new File("index.html");
    
    return file.readAsTextSync();

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
