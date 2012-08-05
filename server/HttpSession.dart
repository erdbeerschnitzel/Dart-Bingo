/**
 * represents a HTTP Session 
 */

class HttpSession {

  String _sessionID;
  Map<String, Dynamic> _attributes;

  HttpSession(){}

  // constructor for new Session
  HttpSession.fromRequest(HttpRequest request, HttpResponse response) {
    _attributes = new Map<String, Dynamic>();
    _sessionID = createSessionId();
    
    //print("created new session with id: $_sessionId");
    
    response.headers.add("Set-Cookie", " DSESSIONID = $_sessionID; HttpOnly");
  }


  bool isNew(var sessionList) {
  
    if(sessionList[_sessionID] == null){

      return false;
    }
    
    return sessionList[_sessionID]["isNew"];
  }

  String getID() => _sessionID;
  
  void setID(var id) => _sessionID = id;

  int getCreationTime() => _sessions[_sessionID]["creationTime"];

  int getLastAccessedTime() => _sessions[_sessionID]["lastAccessedTime"];

  
  // set -1 to use default timeout value
  void setMaxInactiveInterval(int t) {
    
    if (t < 0) t = _defaultMaxInactiveInterval;

    _sessions[_sessionID]["maxInactiveInterval"] = t;
  }

  int getMaxInactiveInterval() => _sessions[_sessionID]["maxInactiveInterval"];

  // getAttribute(String name)
  Dynamic getAttribute(String name) {
    if (_attributes.containsKey(name)) {
      return _attributes[name];
    }
    else return null;
  }

  // setAttribute(String name, Dynamic value)
  void setAttribute(String name, Dynamic value) {
    
    _attributes[name] = value;
    _sessions[_sessionID]["attributes"] = _attributes;
  }

  void removeAttribute(String name) {
    _attributes.remove(name);
    _sessions[_sessionID]["attributes"] = _attributes;
  }
  
  // create  new session ID
  String createSessionId() {
    
    String id = "${(Math.random() * 0x100000000 + 0x100000000).toString()} ${new Date.now().toString()}";
  
    id = CryptoUtils.bytesToHex(new MD5().update(id.charCodes()).digest());
    
    // make it 16 chars long
    id = id.substring(id.length - 16);
  
    return id;
  }
  
  List getAttibuteNames() {
    List rawKeys = _attributes.getKeys();
    var attNames = [];
    for(String x in rawKeys){
      attNames.add(x);
    }
    return attNames;
  }  

}