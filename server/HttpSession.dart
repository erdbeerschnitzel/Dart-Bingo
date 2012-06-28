/*
 *** HttpSession class ***
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
    
    print("created new session with id: $_sessionId");
    
    response.headers.add("Set-Cookie", " DSESSIONID = $_sessionId; Path = ${request.path}; HttpOnly");

  }


  bool isNew(var _session) {
    
    print("hello $_sessionId");
    
    if(_session[_sessionId] == null){
      
      print("NULL!");
      return false;
    }
    
    if(_session[_sessionId]["isNew"] != null) return _session[_sessionId]["isNew"];
    else return false;
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
    _attributes.remove(name);
    _attributes[name] = value;
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
// Note: This is a sample, don't use in real applications.
String createSessionId() {
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
}