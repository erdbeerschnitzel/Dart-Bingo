/**
 * represents a HTTP Session 
 */

class HttpSession {

  String _sessionId;
  Map<String, Dynamic> _attributes;
  
  

  // Construct base session object
  HttpSession(){}

  // Construct new session object
  HttpSession.fresh(HttpRequest request, HttpResponse response) {
    _attributes = new Map<String, Dynamic>();
    _sessionId = createSessionId();
    
    //print("created new session with id: $_sessionId");
    
    response.headers.add("Set-Cookie", " DSESSIONID = $_sessionId; Path = ${request.path}; HttpOnly");

  }


  bool isNew(var _session) {
  
    if(_session[_sessionId] == null){

      return false;
    }
    
    return _session[_sessionId]["isNew"];
  }


  // invalidate() : this session will be deleted at the next request
  void invalidate() {
    _sessions[_sessionId]["invalidated"] = true;
    _sessions[_sessionId]["attributes"] = new Map<String, Dynamic>();
  }


  String getId() => _sessionId;
  
  void setId(String id){
    _sessionId = id;
  }

  int getCreationTime() => _sessions[_sessionId]["creationTime"];

  int getLastAccessedTime() => _sessions[_sessionId]["lastAccessedTime"];

  // setMaxInactiveInterval() : set -1 to use default timeout value
  void setMaxInactiveInterval(int t) {
    if (t < 0) t = _defaultMaxInactiveInterval;
    _sessions[_sessionId].remove("maxInactiveInterval");
    _sessions[_sessionId]["maxInactiveInterval"] = t;
  }

  int getMaxInactiveInterval() => _sessions[_sessionId]["maxInactiveInterval"];

  // getAttribute(String name)
  Dynamic getAttribute(String name) {
    if (_attributes.containsKey(name)) {
      return _attributes[name];
    }
    else return null;
  }

  // setAttribute(String name, Dynamic value)
  void setAttribute(String name, Dynamic value) {
    
    if(_attributes[name] != null) _attributes.remove(name);

    _attributes[name] = value;
    
    print("session is $_sessionId and  ${_sessions[_sessionId]}");
    _sessions[_sessionId].remove("attributes");
    _sessions[_sessionId]["attributes"] = _attributes;
  }

  
  List getAttributeNames() {
    List rawKeys = _attributes.getKeys();
    var attNames = [];
    for(String x in rawKeys){
      attNames.add(x);
    }
    return attNames;
  }

  void removeAttribute(String name) {
    _attributes.remove(name);
    _sessions[_sessionId].remove("attributes");
    _sessions[_sessionId]["attributes"] = _attributes;
  }
  
  // Create a new session ID.
  String createSessionId() {
    
    String id = "${(Math.random() * 0x100000000 + 0x100000000).toString()} ${new Date.now().toString()}";
  
    id = CryptoUtils.bytesToHex(new MD5().update(id.charCodes()).digest());
    
    // make it 16 chars long
    id = id.substring(id.length - 16);
  
    return id;
  }

}