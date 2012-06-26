/*
  *** Cookie based HTTP session manager library ***
  Functions and methods in this library are almost equivalent to those of Java Sevlet.
  Note: Under evaluation. Do not use this code for actual applications.
        Applications should not use response.headers.set("Set-Cookie", someString);
        Instard, use the setCookieParameter method.
  Available functions and methods:
    HttpSession getSession(HttpRequest request, HttpResponse response)
    String getRequestedSessionId(HttpRequest request)
    bool isRequestedSessionIdValid(HttpRequest request)
    bool HttpSession#isNew()
    void HttpSession#invalidate()
    String HttpSession#getId()
    int HttpSession#getCreationTime()
    int HttpSession#getLastAccessedTime()
    void HttpSession#setMaxInactiveInterval(int t)
    int HttpSession#getMaxInactiveInterval()
    Dynamic HttpSession#getAttribute(String name)
    void HttpSession#setAttribute(String name, Dynamic value)
    void HttpSession#removeAttribute(String name)
    void setCookieParameter(HttpResponse response, String name, String value, [String path = null])
    Map getCookieParameters(HttpRequest request)
  Ref: www.cresc.co.jp/tech/java/Google_Dart/DartLanguageGuide.pdf (in Japanese)
  May 2012, by Cresc Corp.
*/

#library("HttpSessionManager");
#import("dart:utf", prefix:"utf");
#import("dart:io");
#source('HttpSession.dart');

// *** Top level session table ***
Map<String, Map> _sessions;  // session table
final int _defaultMaxInactiveInterval = 1800;  // 30 minutes default timeout
final int _sessionGarbageCollectorTick = 300;  // repeat every 5 minutes

// *** Top level functions ***
// getSession
HttpSession getSession(HttpRequest request, HttpResponse response) {
  
  if (_sessions == null) {
    _sessions = new Map<String, Map>();
    sessionGarbageCollect();
  };
  
  var id = getRequestedSessionId(request);
  
  if (id == null) return new HttpSession.fresh(request, response);
  else if (_sessions[id] == null) return new HttpSession.fresh(request, response);
  else if (_sessions[id]["invalidated"] == true) {
    _sessions.remove(id);
    return new HttpSession.fresh(request, response);
  }
  else { // session exist
    HttpSession session = new HttpSession();
    session._sessionId = id;
    session._attributes = _sessions[id]["attributes"];
    var lastAccessedTime =_sessions[id]["lastAccessedTime"];
    var maxInactiveInterval = _sessions[id]["maxInactiveInterval"];
    _sessions[id].remove("lastAccessedTime");
    _sessions[id]["lastAccessedTime"] = new Date.now().millisecondsSinceEpoch;
    _sessions[id].remove("isNew");
    _sessions[id]["isNew"] = false;
    
    if (maxInactiveInterval < 0) return session;
    
    else if (new Date.now().millisecondsSinceEpoch > lastAccessedTime + maxInactiveInterval * 1000){
      _sessions.remove(id); // session expired
      session = new HttpSession.fresh(request, response);
    }
    return session;
  }
}

// Get session ID from the request.
String getRequestedSessionId(HttpRequest request) {
  if (getCookieParameters(request) == null) return null;
  else return getCookieParameters(request)["DSESSIONID"];
}

// isRequestedSessionIdValid(HttpRequest request)
bool isRequestedSessionIdValid(HttpRequest request) {
  var id = getRequestedSessionId(request);
  if (id == null) return false;
  else if (_sessions.containsKey(id) == false) return false;
  else if (_sessions[id]["invalidated"] == true) return false;
  else if (_sessions[id]["lastAccessedTime"] + _sessions[id]["maxInactiveInterval"] * 1000 > new Date.now()) {
    return true;
  }
  else return false;
}

// Set cookie parameter to the response header.
// (Name and value will be URL encoded.)
void setCookieParameter(HttpResponse response, String name, String value, [String path = null]) {
  if (path == null) {
    response.headers.add("Set-Cookie",
        "${new String.fromCharCodes(_urlEncode(name))} = ${new String.fromCharCodes(_urlEncode(value))}");
  }
  else response.headers.add("Set-Cookie",
    "${new String.fromCharCodes(_urlEncode(name))} = ${new String.fromCharCodes(_urlEncode(value))}; Path = ${path} ");
}

// Get cookie parameters from the request
Map getCookieParameters(HttpRequest request) {
  String cookieHeader = request.headers.value("Cookie");
  if (cookieHeader == null) return null; // no Session header included
  return _splitHeaderString(cookieHeader);
}

// Session garbage collection (modify this to run at midnight)
void sessionGarbageCollect() {
  print("${new Date.now()} sessionGarbageCollector started");
  void collect(Timer t) {
    int now = new Date.now();
    _sessions.forEach((key, value){
      if (key != "" && _sessions[key]["lastAccessedTime"] + _sessions[key]["maxInactiveInterval"] * 1000 < now) {
        _sessions.remove(key);
        print("${new Date.now()} sessionGarbageCollector -- removed session $key");
      }
    });
  }
  //new Timer.repeating(_sessionGarbageCollectorTick * 1000, collect);
}



/*
 *** Utilities ***
*/

// Split cookie header string.
// "," separation is used for cookies in a single set-cookie folded header
// ";" separation is used for cookies sent by multiple set-cookie headers
Map<String, String> _splitHeaderString(String cookieString) {
  Map<String, String> result = new Map<String, String>();
  int currentPosition = 0;
  int position0;
  int position1;
  int position2;
  while (currentPosition < cookieString.length) {
    int position = cookieString.indexOf("=", currentPosition);
    if (position == -1) {
      break;
    }
    String name = cookieString.substring(currentPosition, position);
    currentPosition = position + 1;
    position1 = cookieString.indexOf(";", currentPosition);
    position2 = cookieString.indexOf(",", currentPosition);
    String value;
    if (position1 == -1 && position2 == -1) {
      value = cookieString.substring(currentPosition);
      currentPosition = cookieString.length;
    } else {
      if (position1 == -1) position0 = position2;
      else if (position2 == -1) position0 = position1;
      else if (position1 < position2) position0 = position1;
      else position0 = position2;
      value = cookieString.substring(currentPosition, position0);
        currentPosition = position0 + 1;
    }
    result[_urlDecode(name.trim())] = _urlDecode(value.trim());
  }
  return result;
}

// Create a new session ID.
// Note: This is a sample, don't use in real applications.
String _createSessionId() {
  String rndHash = _createHash((Math.random() * 0x100000000 + 0x100000000).toInt());
  String dateHash = _createHash(Clock.now() & 0xFFFFFFFF);
  return "${rndHash}${dateHash}";
}

// Create hash hexa string from int value.
String _createHash(int iv) {
  List bytes = [];
  for (int i = 0; i < 4; i++){
    bytes.add(iv & 0xff);
    iv = iv >> 8;
  }
  var hexaHash = "";
  int intHash = _getHash(bytes);
  for (int i = 0; i < 8; i++){
    hexaHash = (intHash & 0xf).toRadixString(16).concat(hexaHash);
    intHash = intHash >> 4;
  }
  return hexaHash;
}

// Fowler/Noll/Vo (FNV) 32-bit hash function.
int _getHash(List<int> bytes) {
  int fnv_prime = 0x811C9DC5;
  int hash = 0;
  for(int i = 0; i < bytes.length; i++)
  {
    hash *= fnv_prime;
    hash ^= bytes[i];
  }
  return hash & 0xFFFFFFFF;
}

// URL decoder decodes url encoded utf-8 bytes.
// Use this method to decode query string.
String _urlDecode(String s){
  int i, p, q;
   var ol = new List<int>();
   for (i = 0; i < s.length; i++) {
     if (s[i].charCodeAt(0) == 0x2b) ol.add(0x20); // convert + to space
     else if (s[i].charCodeAt(0) == 0x25) {        // convert hex bytes to a single bite
       i++;
       p = s[i].toUpperCase().charCodeAt(0) - 0x30;
       if (p > 9) p = p - 7;
       i++;
       q = s[i].toUpperCase().charCodeAt(0) - 0x30;
       if (q > 9) q = q - 7;
       ol.add(p * 16 + q);
     }
     else ol.add(s[i].charCodeAt(0));
   }
  return utf.decodeUtf8(ol);
}

// URL encoder encodes string into url encoded utf-8 bytes.
// Use this method to encode cookie string
// or to write URL encoded byte data into OutputStream.
List<int> _urlEncode(String s) {
  int i, p, q;
  var ol = new List<int>();
  List<int> il = utf.encodeUtf8(s);
  for (i = 0; i < il.length; i++) {
    if (il[i] == 0x20) ol.add(0x2b);  // convert sp to +
    else if (il[i] == 0x2a || il[i] == 0x2d || il[i] == 0x2e || il[i] == 0x5f) ol.add(il[i]);  // do not convert
    else if ((il[i] >= 0x30) && (il[i] <= 0x39) || (il[i] >= 0x41) && (il[i] <= 0x5a) ||
        (il[i] >= 0x61) && (il[i] <= 0x7a)) ol.add(il[i]);
    else { // '%' shift
      ol.add(0x25);
      ol.add((il[i] ~/ 0x10).toRadixString(16).charCodeAt(0));
      ol.add((il[i] & 0xf).toRadixString(16).charCodeAt(0));
    }
  }
  return ol;
}

// Create session log
StringBuffer createSessionLog(HttpSession session, HttpRequest request) {
  var sb = new StringBuffer("");
  if (session == null) sb.add("HttpSession data : null");
  else if (session.getId() == null) sb.add("HttpSession data : null");
  else sb.add('''HttpSession related data:
  number of existing sessions : ${_sessions.length}
  getCookieParameters : ${getCookieParameters(request)}
  getRequestedSessionId : ${getRequestedSessionId(request)}
  isRequestedSessionIdValid : ${isRequestedSessionIdValid(request)}
  session.isNew : ${session.isNew()}
  session.getId : ${session.getId()}
  session.getCreationTime : ${new Date.fromMillisecondsSinceEpoch(session.getCreationTime(), false)}
  session.getLastAccessedTime : ${new Date.fromMillisecondsSinceEpoch(session.getLastAccessedTime(), false)}
  session.getMaxInactiveInterval : ${session.getMaxInactiveInterval()} Seconds
  session.getAttributeNames : ${session.getAttributeNames()}
''');
  return sb;
}