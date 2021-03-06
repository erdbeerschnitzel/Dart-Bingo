/**
 * Manages HTTP Sessions
 * inspired by www.cresc.co.jp/tech/java/Google_Dart/DartLanguageGuide.pdf (in Japanese)
 **/

library HttpSessionManager;
import "dart:utf" as utf;
import "dart:io";
import 'dart:isolate';
import 'dart:crypto';
import 'dart:math';
import 'dart:async';
part 'HttpSession.dart';


Map<String, Map> _sessions;
final int _defaultMaxInactiveInterval = 1800;  // 30 minutes

class HttpSessionManager{

  final int _sessionGarbageCollectionDelay = 300*1000;  // 5 minutes
  Map<String, dynamic> _attributes;

  // init constructor
  HttpSessionManager(){

    _sessions = new Map<String, Map>();
    new Timer.repeating(_sessionGarbageCollectionDelay , sessionGarbageCollect);
  }

  // return sessions map
  Map<String, Map> getSessions(){

    if(_sessions != null) { return _sessions;
    } else {
      print("sessions was null in getSessions");
      return new Map<String, Map>();
    }
  }


  // get the current Session for client or create a new one
  HttpSessionObject getSession(HttpRequest request, HttpResponse response) {

    if (_sessions == null) _sessions = new Map<String, Map>();


    String id = getRequestSessionId(request);

    if (id == null) {

      HttpSessionObject sess = new HttpSessionObject.fromRequest(response);

      _sessions[sess.getID()] = {"isNew": true, "creationTime": new DateTime.now(), "loggedin": false,
                               "lastAccessedTime": new DateTime.now().millisecondsSinceEpoch, "maxInactiveInterval": _defaultMaxInactiveInterval, "attributes": _attributes};
      return sess;
    }

    else if (_sessions[id] == null) {

      print("session $id not found in sessions ${_sessions.keys}");
      HttpSessionObject newSession =  new HttpSessionObject.fromRequest(response);

      newSession.setID(id);

      _sessions[id] = {"isNew": true, "creationTime": new DateTime.now(), "loggedin": false,
                                 "lastAccessedTime": new DateTime.now().millisecondsSinceEpoch, "maxInactiveInterval": _defaultMaxInactiveInterval, "attributes": _attributes};

      return newSession;
    }
    // session exists
    else {

      HttpSessionObject session = new HttpSessionObject();
      session._sessionID = id;
      session._attributes = _sessions[id]["attributes"];

      var lastAccessedTime =_sessions[id]["lastAccessedTime"];
      var maxInactiveInterval = _sessions[id]["maxInactiveInterval"];

      _sessions[id]["lastAccessedTime"] = new DateTime.now().millisecondsSinceEpoch;
      _sessions[id]["isNew"] = false;

      if (maxInactiveInterval < 0) { return session;

      // session expired
      } else if (new DateTime.now().millisecondsSinceEpoch > lastAccessedTime + maxInactiveInterval * 1000){
        _sessions.remove(id);
        print("session $id expired");
        session = new HttpSessionObject.fromRequest(response);
      }

      return session;
    }
  }

  // Get session ID from request
  String getRequestSessionId(HttpRequest request) {

    if (getCookieParameters(request) == null) { return null;
    } else { return getCookieParameters(request)["DSESSIONID"];
    }
  }


  // check if session is valid
  bool isSessionIdValid(HttpRequest request) {

    var id = getRequestSessionId(request);
    if (id == null) { return false;
    } else if (_sessions.containsKey(id) == false) { return false;
    } else if (_sessions[id]["lastAccessedTime"] + _sessions[id]["maxInactiveInterval"] * 1000 > new DateTime.now()) {
      return true;
    }
    else { return false;
    }
  }

  // Get cookie parameters from request
  Map getCookieParameters(HttpRequest request) {

    String cookieHeader = request.headers.value("Cookie");

    Map result = new Map();

    // no Session header included
    if (cookieHeader == null) { return null;
    } else {

      List list = cookieHeader.replaceAll(" ", "").split(";");

      if(list.length > 0){

        for(int i = 0; i < list.length; i++){

          String name = list[i].substring(0, list[i].indexOf("="));
          String value = list[i].substring(list[i].indexOf("=")+1);

          result[name] = value;
        }
      }
    }

    return result;
  }

  // Session garbage collection
  void sessionGarbageCollect(timeevent) {

    print("${new DateTime.now()}: sessionGarbageCollector started");

      int now = new DateTime.now().millisecondsSinceEpoch;

      _sessions.forEach((key, value){

        if (key != "" && _sessions[key]["lastAccessedTime"] + _sessions[key]["maxInactiveInterval"] * 1000 < now) {

          _sessions.remove(key);
          print("${new DateTime.now()}: sessionGarbageCollector: removed session $key");
        }
      });

  }

}