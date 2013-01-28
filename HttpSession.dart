part of HttpSessionManager;

/**
 * represents a HTTP Session
 */

class HttpSessionObject {

  String _sessionID;
  Map<String, dynamic> _attributes;

  HttpSessionObject(){}

  // constructor for new Session
  HttpSessionObject.fromRequest(HttpResponse response) {
    _attributes = new Map<String, dynamic>();
    _sessionID = createSessionId();

    //print("created new session with id: $_sessionId");

    response.headers.add("Set-Cookie", " DSESSIONID = $_sessionID; Path = /; HttpOnly");
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


  //
  dynamic getAttribute(String name) {

    if (_sessions[_sessionID]["attributes"].containsKey(name)) {
      return _sessions[_sessionID]["attributes"][name];
    }
    else { return null;
    }
  }

  //
  void setAttribute(String name, dynamic value) {

    _attributes[name] = value;
    _sessions[_sessionID]["attributes"] = _attributes;
  }

  void removeAttribute(String name) {
    _attributes.remove(name);
    _sessions[_sessionID]["attributes"] = _attributes;
  }

  // create  new session ID
  String createSessionId() {

    String id = "${(new Random().nextInt(55555) * 0x100000000 + 0x100000000).toString()} ${new Date.now().toString()}";

    id = CryptoUtils.bytesToHex(new MD5().add(id.charCodes).digest());

    // make it 16 chars long
    id = id.substring(id.length - 16);

    return id;
  }


}