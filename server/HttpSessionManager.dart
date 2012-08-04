/**
 * Manages HTTP Sessions
 * inspired by www.cresc.co.jp/tech/java/Google_Dart/DartLanguageGuide.pdf (in Japanese)
 **/

#library("HttpSessionManager");
#import("dart:utf", prefix:"utf");
#import("dart:io");
#import('dart:isolate');
#import('dart:crypto');
#source('HttpSession.dart');

// these vars are visible to the HttpSession class
Map<String, Map> _sessions;
final int _defaultMaxInactiveInterval = 1800;  // 30 minutes default timeout

// class start
class HttpSessionManager{

  final int _sessionGarbageCollectorTick = 300;  // repeat every 5 minutes
  Map<String, Dynamic> _attributes;
  
  // init constructor
  HttpSessionManager(){
    
    _sessions = new Map<String, Map>();
  }
  
  //
  Map<String, Map> getSessions(){
    
    if(_sessions != null) return _sessions;
    else {
      print("sessions was null in getSessions");
      return new Map<String, Map>();
    }
  }
  
  
  // get the current Session for client or create a new one
  HttpSession getSession(HttpRequest request, HttpResponse response) {
    
    if (_sessions == null) {
      
      print("sessions was null");
      _sessions = new Map<String, Map>();
      sessionGarbageCollect();
    };
    
    var id = getRequestedSessionId(request);
    
    //print("fetched id: $id");
    
    if (id == null) {
      
      HttpSession sess = new HttpSession.fresh(request, response);
      _sessions[sess.getId()] = {"invalidated": false, "isNew": true, "creationTime": new Date.now(), "loggedin": false,
                               "lastAccessedTime": new Date.now().millisecondsSinceEpoch, "maxInactiveInterval": _defaultMaxInactiveInterval, "attributes": _attributes};
      return sess;
    }
    
    else if (_sessions[id] == null) {
      
      //print("session not found in sessions");
      HttpSession newSession =  new HttpSession.fresh(request, response);
      
      newSession.setId(id);
      
      _sessions[id] = {"invalidated": false, "isNew": true, "creationTime": new Date.now(), "loggedin": false,
                                 "lastAccessedTime": new Date.now().millisecondsSinceEpoch, "maxInactiveInterval": _defaultMaxInactiveInterval, "attributes": _attributes};
      
      return newSession;
    }
    
    else if (_sessions[id]["invalidated"] == true) {
      
      _sessions.remove(id);
      return new HttpSession.fresh(request, response);
    }
    
    else { // session exist
      
      print("found existing session id");
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
        print("session $id expired");
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
//  void setCookieParameter(HttpResponse response, String name, String value, [String path = null]) {
//    if (path == null) {
//      response.headers.add("Set-Cookie",
//          "${new String.fromCharCodes(_urlEncode(name))} = ${new String.fromCharCodes(_urlEncode(value))}");
//    }
//    else response.headers.add("Set-Cookie",
//      "${new String.fromCharCodes(_urlEncode(name))} = ${new String.fromCharCodes(_urlEncode(value))}; Path = ${path} ");
//  }
  
  // Get cookie parameters from the request
  Map getCookieParameters(HttpRequest request) {
    String cookieHeader = request.headers.value("Cookie");
    if (cookieHeader == null) return null; // no Session header included
    return _splitHeaderString(cookieHeader);
  }
  
  // Session garbage collection (modify this to run at midnight)
  void sessionGarbageCollect() {
    
    print("${new Date.now()} sessionGarbageCollector started");
    
    void collect(timeevent) {
      int now = new Date.now().millisecondsSinceEpoch;
      _sessions.forEach((key, value){
        if (key != "" && _sessions[key]["lastAccessedTime"] + _sessions[key]["maxInactiveInterval"] * 1000 < now) {
          _sessions.remove(key);
          print("${new Date.now()} sessionGarbageCollector -- removed session $key");
        }
      });
    }
    
    new Timer.repeating(_sessionGarbageCollectorTick * 1000, collect);
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

}