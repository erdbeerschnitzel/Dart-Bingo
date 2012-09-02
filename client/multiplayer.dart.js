function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.DateImplementation = {"":
 ["millisecondsSinceEpoch?", "isUtc"],
 "super": "Object",
 operator$eq$1: function(other) {
  if (!(typeof other === 'object' && other !== null && !!other.is$Date))
    return false;
  return $.eq(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$lt$1: function(other) {
  return $.lt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$gt$1: function(other) {
  return $.gt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$ge$1: function(other) {
  return $.ge(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 hashCode$0: function() {
  return this.millisecondsSinceEpoch;
},
 toString$0: function() {
  var t1 = new $.DateImplementation_toString_fourDigits();
  var t2 = new $.DateImplementation_toString_threeDigits();
  var t3 = new $.DateImplementation_toString_twoDigits();
  var y = t1.call$1(this.get$year());
  var m = t3.call$1(this.get$month());
  var d = t3.call$1(this.get$day());
  var h = t3.call$1(this.get$hour());
  var min = t3.call$1(this.get$minute());
  var sec = t3.call$1(this.get$second());
  var ms = t2.call$1(this.get$millisecond());
  if (this.isUtc === true)
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  else
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
},
 add$1: function(duration) {
  return $.DateImplementation$fromMillisecondsSinceEpoch($.add(this.millisecondsSinceEpoch, duration.get$inMilliseconds()), this.isUtc);
},
 get$year: function() {
  return $.Primitives_getYear(this);
},
 get$month: function() {
  return $.Primitives_getMonth(this);
},
 get$day: function() {
  return $.Primitives_getDay(this);
},
 get$hour: function() {
  return $.Primitives_getHours(this);
},
 get$minute: function() {
  return $.Primitives_getMinutes(this);
},
 get$second: function() {
  return $.Primitives_getSeconds(this);
},
 get$millisecond: function() {
  return $.Primitives_getMilliseconds(this);
},
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000))
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
  t1 = this.isUtc;
  if (t1 == null)
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
},
 DateImplementation$now$0: function() {
  $.Primitives_lazyAsJsDate(this);
},
 is$Date: true
};

$$.ExceptionImplementation = {"":
 ["_msg"],
 "super": "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
}
};

$$.HashMapImplementation = {"":
 ["_keys", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 "super": "Object",
 _probeForAdding$1: function(key) {
  var t1 = $.hashCode(key);
  if (t1 !== (t1 | 0))
    return this._probeForAdding$1$bailout(1, key, t1, 0, 0, 0);
  var t3 = $.get$length(this._keys);
  if (t3 !== (t3 | 0))
    return this._probeForAdding$1$bailout(2, key, t1, t3, 0, 0);
  var hash = (t1 & t3 - 1) >>> 0;
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(3, key, hash, numberOfProbes, insertionIndex, t1);
    if (hash < 0 || hash >= t1.length)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC15 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(4, numberOfProbes0, key, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      t1 = env1;
      break;
    case 2:
      key = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 4:
      numberOfProbes0 = env0;
      key = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.hashCode(key);
    case 1:
      state = 0;
      var t3 = $.get$length(this._keys);
    case 2:
      state = 0;
      var hash = $.and(t1, $.sub(t3, 1));
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t1 = this._keys;
            case 3:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC15 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 4:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 _probeForLookup$1: function(key) {
  var hash = $.and($.hashCode(key), $.sub($.get$length(this._keys), 1));
  if (hash !== (hash | 0))
    return this._probeForLookup$1$bailout(1, key, hash);
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForLookup$1$bailout: function(state, key, hash) {
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListImplementation_List(newCapacity);
  this._values = $.ListImplementation_List(newCapacity, $.getRuntimeTypeInfo(this).V);
  for (var i = 0; i < capacity; ++i) {
    if (i < 0 || i >= oldKeys.length)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC15)
      continue;
    if (i < 0 || i >= oldValues.length)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListImplementation_List(newCapacity);
      this._values = $.ListImplementation_List(newCapacity, $.getRuntimeTypeInfo(this).V);
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC15)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) == null || $.index(this._keys, index) === $.CTC15)
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC15);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 get$length: function() {
  return this._numberOfEntries;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC15))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC15))
      f.call$2(key, $.index(this._values, i));
  }
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = 6;
  this._keys = $.ListImplementation_List(8);
  this._values = $.ListImplementation_List(8, $.getRuntimeTypeInfo(this).V);
},
 is$Map: function() { return true; }
};

$$._DeletedKeySentinel = {"":
 [],
 "super": "Object"
};

$$.KeyValuePair = {"":
 ["key?", "value="],
 "super": "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_list", "_map"],
 "super": "Object",
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value, $.getRuntimeTypeInfo(this).K, $.getRuntimeTypeInfo(this).V));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value, $.getRuntimeTypeInfo(this).K, $.getRuntimeTypeInfo(this).V));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 get$length: function() {
  return $.get$length(this._map);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$($.getRuntimeTypeInfo(this).K, 'DoubleLinkedQueueEntry<KeyValuePair<K, V>>');
  this._list = $.DoubleLinkedQueue$('KeyValuePair<K, V>');
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_previous=", "_next=", "_element?"],
 "super": "Object",
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 prepend$1: function(e) {
  $.DoubleLinkedQueueEntry$(e, $.getRuntimeTypeInfo(this).E)._link$2(this._previous, this);
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 get$element: function() {
  return this._element;
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_next", "_element"],
 "super": "DoubleLinkedQueueEntry",
 remove$0: function() {
  throw $.captureStackTrace($.CTC14);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 get$element: function() {
  throw $.captureStackTrace($.CTC14);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 "super": "Object",
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 first$0: function() {
  return this._sentinel.get$_next().get$element();
},
 get$first: function() { return new $.BoundClosure(this, 'first$0'); },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$($.getRuntimeTypeInfo(this).E);
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_element()) === true)
      other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
},
 iterator$0: function() {
  return $._DoubleLinkedQueueIterator$(this._sentinel, $.getRuntimeTypeInfo(this).E);
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 DoubleLinkedQueue$0: function() {
  this._sentinel = $._DoubleLinkedQueueEntrySentinel$($.getRuntimeTypeInfo(this).E);
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.JSSyntaxRegExp = {"":
 ["_ignoreCase", "_multiLine", "_lib0_pattern"],
 "super": "Object",
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 get$pattern: function() {
  return this._lib0_pattern;
},
 get$multiLine: function() {
  return this._multiLine;
},
 get$ignoreCase: function() {
  return this._ignoreCase;
},
 is$RegExp: true
};

$$.StringBufferImpl = {"":
 ["_buffer", "_length"],
 "super": "Object",
 get$length: function() {
  return this._length;
},
 isEmpty$0: function() {
  return this._length === 0;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
  return this;
},
 clear$0: function() {
  this._buffer = $.ListImplementation_List(null, 'String');
  this._length = 0;
  return this;
},
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.stringJoinUnchecked($.StringImplementation__toJsStringArray(this._buffer), '');
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value?"],
 "super": "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
}
};

$$.NoSuchMethodException = {"":
 ["_receiver", "_functionName", "_arguments", "_existingArgumentNames"],
 "super": "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, t1, sb);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
}
};

$$.ObjectNotClosureException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Object is not closure';
}
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 "super": "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
}
};

$$.StackOverflowException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Stack Overflow';
}
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 "super": "Object",
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 get$exceptionName: function() {
  return 'NullPointerException';
}
};

$$.NoMoreElementsException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
}
};

$$.EmptyQueueException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'EmptyQueueException';
}
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
}
};

$$.NotImplementedException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
}
};

$$.IllegalJSRegExpException = {"":
 ["_pattern", "_errmsg"],
 "super": "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
}
};

$$.Object = {"":
 [],
 "super": "",
 toString$0: function() {
  return $.ObjectImplementation_toStringImpl(this);
},
 operator$eq$1: function(other) {
  return this === other;
}
};

$$._Random = {"":
 [],
 "super": "Object",
 nextInt$1: function(max) {
  if (max < 0)
    throw $.captureStackTrace($.IllegalArgumentException$('negative max: ' + $.S(max)));
  if (max > 4294967295)
    max = 4294967295;
  return (Math.random() * max) >>> 0;
}
};

$$.ListIterator = {"":
 ["i", "list"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
}
};

$$.Closure = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_set?"],
 "super": "Object"
};

$$.Gamecard = {"":
 ["fields?", "RNG"],
 "super": "Object",
 initFields$0: function() {
  this.RNG = $.RandomNumberGenerator$();
  var t1 = this.fields;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.initFields$0$bailout(1, t1, 0, 0, 0, 0, 0);
  var i = 0;
  for (; i < 5; ++i) {
    $.add$1(t1, $.ListImplementation_List(null, 'String'));
    for (var t2 = i === 2, x = 0; x < 5; ++x) {
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      $.add$1(t1[i], '0');
      if (x === 2 && t2) {
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        var t3 = t1[i];
        if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior())
          return this.initFields$0$bailout(2, i, t2, x, t3, t1, 0);
        if (x < 0 || x >= t3.length)
          throw $.ioore(x);
        t3[x] = '';
      } else {
        var temp = this.RNG.getRandomNumber$0();
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        t3 = t1[i];
        if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior())
          return this.initFields$0$bailout(3, temp, t3, i, t2, x, t1);
        var t5 = $.toString(temp);
        if (x < 0 || x >= t3.length)
          throw $.ioore(x);
        t3[x] = t5;
      }
    }
  }
},
 initFields$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      i = env0;
      t2 = env1;
      x = env2;
      t3 = env3;
      t1 = env4;
      break;
    case 3:
      temp = env0;
      t3 = env1;
      i = env2;
      t2 = env3;
      x = env4;
      t1 = env5;
      break;
  }
  switch (state) {
    case 0:
      this.RNG = $.RandomNumberGenerator$();
      var t1 = this.fields;
    case 1:
      state = 0;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < 5))
                break L0;
              $.add$1(t1, $.ListImplementation_List(null, 'String'));
              var t2 = i === 2;
              var x = 0;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(x < 5))
                        break L1;
                      $.add$1($.index(t1, i), '0');
                    default:
                      if (state === 2 || state === 0 && x === 2 && t2)
                        switch (state) {
                          case 0:
                            var t3 = $.index(t1, i);
                          case 2:
                            state = 0;
                            $.indexSet(t3, x, '');
                        }
                      else
                        switch (state) {
                          case 0:
                            var temp = this.RNG.getRandomNumber$0();
                            t3 = $.index(t1, i);
                          case 3:
                            state = 0;
                            $.indexSet(t3, x, $.toString(temp));
                        }
                      ++x;
                  }
              ++i;
          }
  }
},
 createCardHTML$1: function(forComputer) {
  var cardstring = $.StringBufferImpl$('');
  var t1 = this.fields;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.createCardHTML$1$bailout(1, forComputer, t1, cardstring, 0, 0, 0, 0, 0, 0, 0);
  var t3 = $.iterator(t1);
  var x = 0;
  var i = 0;
  for (; t3.hasNext$0() === true;) {
    var t2 = t3.next$0();
    cardstring.add$1('<tr>');
    for (var t2 = $.iterator(t2), t4 = i < 5; t2.hasNext$0() === true;) {
      t2.next$0();
      if (forComputer) {
        if (x < 5 && t4) {
          var t5 = '<td id="c' + $.S(i) + $.S(x) + '"class=top>';
          if (i < 0 || i >= t1.length)
            throw $.ioore(i);
          var t6 = t1[i];
          if (typeof t6 !== 'string' && (typeof t6 !== 'object' || t6 === null || t6.constructor !== Array && !t6.is$JavaScriptIndexingBehavior()))
            return this.createCardHTML$1$bailout(2, forComputer, x, cardstring, t5, t4, t6, t3, t1, t2, i);
          if (x < 0 || x >= t6.length)
            throw $.ioore(x);
          cardstring.add$1(t5 + $.S(t6[x]) + '</td>');
        }
      } else if (x < 5 && t4) {
        t5 = '<td id="p' + $.S(i) + $.S(x) + '"class=top>';
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        t6 = t1[i];
        if (typeof t6 !== 'string' && (typeof t6 !== 'object' || t6 === null || t6.constructor !== Array && !t6.is$JavaScriptIndexingBehavior()))
          return this.createCardHTML$1$bailout(3, forComputer, x, cardstring, t5, t4, t6, t3, t1, t2, i);
        if (x < 0 || x >= t6.length)
          throw $.ioore(x);
        cardstring.add$1(t5 + $.S(t6[x]) + '</td>');
      }
      if (x === 4) {
        cardstring.add$1('</tr>');
        x = 0;
      } else
        ++x;
    }
    i = i === 4 ? 0 : i + 1;
  }
  return cardstring.toString$0();
},
 createCardHTML$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      var forComputer = env0;
      t1 = env1;
      cardstring = env2;
      break;
    case 2:
      forComputer = env0;
      x = env1;
      cardstring = env2;
      t5 = env3;
      t4 = env4;
      t6 = env5;
      t3 = env6;
      t1 = env7;
      t2 = env8;
      i = env9;
      break;
    case 3:
      forComputer = env0;
      x = env1;
      cardstring = env2;
      t5 = env3;
      t4 = env4;
      t6 = env5;
      t3 = env6;
      t1 = env7;
      t2 = env8;
      i = env9;
      break;
  }
  switch (state) {
    case 0:
      var cardstring = $.StringBufferImpl$('');
      var t1 = this.fields;
    case 1:
      state = 0;
      var t3 = $.iterator(t1);
      var x = 0;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(t3.hasNext$0() === true))
                break L0;
              var t2 = t3.next$0();
              cardstring.add$1('<tr>');
              t2 = $.iterator(t2);
              var t4 = i < 5;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(t2.hasNext$0() === true))
                        break L1;
                      t2.next$0();
                    default:
                      if (state === 2 || state === 0 && forComputer)
                        switch (state) {
                          case 0:
                          case 2:
                            if (state === 2 || state === 0 && x < 5 && t4)
                              switch (state) {
                                case 0:
                                  var t5 = '<td id="c' + $.S(i) + $.S(x) + '"class=top>';
                                  var t6 = $.index(t1, i);
                                case 2:
                                  state = 0;
                                  cardstring.add$1(t5 + $.S($.index(t6, x)) + '</td>');
                              }
                        }
                      else
                        switch (state) {
                          case 0:
                          case 3:
                            if (state === 3 || state === 0 && x < 5 && t4)
                              switch (state) {
                                case 0:
                                  t5 = '<td id="p' + $.S(i) + $.S(x) + '"class=top>';
                                  t6 = $.index(t1, i);
                                case 3:
                                  state = 0;
                                  cardstring.add$1(t5 + $.S($.index(t6, x)) + '</td>');
                              }
                        }
                      if (x === 4) {
                        cardstring.add$1('</tr>');
                        x = 0;
                      } else
                        ++x;
                  }
              i = i === 4 ? 0 : i + 1;
          }
      return cardstring.toString$0();
  }
},
 checkBingo$0: function() {
  var t1 = this.fields;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.checkBingo$0$bailout(1, t1, 0, 0, 0, 0, 0);
  var t3 = t1.length;
  var i = 0;
  var result = true;
  for (; i < 5; ++i) {
    for (var t2 = i === 2, x = 0, result = true; x < 5; ++x)
      if (t2 && x === 2)
        ;
      else {
        if (i < 0 || i >= t3)
          throw $.ioore(i);
        var t4 = t1[i];
        if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))
          return this.checkBingo$0$bailout(2, t4, x, result, t1, i, t2);
        if (x < 0 || x >= t4.length)
          throw $.ioore(x);
        t4 = t4[x];
        if (typeof t4 !== 'string')
          return this.checkBingo$0$bailout(3, x, result, t1, t4, i, t2);
        if (!(t4 === '0'))
          result = false;
      }
    if (result)
      return result;
    for (result = true, x = 0; x < 5; ++x)
      if (t2 && x === 2)
        ;
      else {
        if (x < 0 || x >= t3)
          throw $.ioore(x);
        t4 = t1[x];
        if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))
          return this.checkBingo$0$bailout(4, x, t1, i, t2, t4, result);
        if (i < 0 || i >= t4.length)
          throw $.ioore(i);
        t4 = t4[i];
        if (typeof t4 !== 'string')
          return this.checkBingo$0$bailout(5, t4, x, t1, i, t2, result);
        if (!(t4 === '0'))
          result = false;
      }
    if (result)
      return result;
  }
  return result;
},
 checkBingo$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      x = env1;
      result = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      break;
    case 3:
      x = env0;
      result = env1;
      t1 = env2;
      t3 = env3;
      i = env4;
      t2 = env5;
      break;
    case 4:
      x = env0;
      t1 = env1;
      i = env2;
      t2 = env3;
      t3 = env4;
      result = env5;
      break;
    case 5:
      t3 = env0;
      x = env1;
      t1 = env2;
      i = env3;
      t2 = env4;
      result = env5;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.fields;
    case 1:
      state = 0;
      var i = 0;
      var result = true;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < 5))
                break L0;
              var t2 = i === 2;
              var x = 0;
              result = true;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(x < 5))
                        break L1;
                    default:
                      if (state === 0 && t2 && x === 2)
                        ;
                      else
                        switch (state) {
                          case 0:
                            var t3 = $.index(t1, i);
                          case 2:
                            state = 0;
                            t3 = $.index(t3, x);
                          case 3:
                            state = 0;
                            if (!$.eqB(t3, '0'))
                              result = false;
                        }
                      ++x;
                  }
              if (result)
                return result;
              result = true;
              x = 0;
            case 4:
            case 5:
              L2:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(x < 5))
                        break L2;
                    default:
                      if (state === 0 && t2 && x === 2)
                        ;
                      else
                        switch (state) {
                          case 0:
                            t3 = $.index(t1, x);
                          case 4:
                            state = 0;
                            t3 = $.index(t3, i);
                          case 5:
                            state = 0;
                            if (!$.eqB(t3, '0'))
                              result = false;
                        }
                      ++x;
                  }
              if (result)
                return result;
              ++i;
          }
      return result;
  }
},
 toWSMessage$0: function() {
  var sb = $.StringBufferImpl$('');
  sb.add$1('GAMECARD:');
  var t1 = this.fields;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toWSMessage$0$bailout(1, t1, sb, 0, 0, 0, 0, 0);
  var i = 0;
  for (; i < 5; ++i)
    for (var t2 = i === 0, t3 = i === 2, x = 0; x < 5; ++x)
      if (t2 && x === 0) {
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        var t4 = t1[i];
        if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))
          return this.toWSMessage$0$bailout(2, t1, sb, t4, t2, x, t3, i);
        if (x < 0 || x >= t4.length)
          throw $.ioore(x);
        sb.add$1($.S(t4[x]));
      } else if (t3 && x === 2)
        ;
      else {
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        t4 = t1[i];
        if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))
          return this.toWSMessage$0$bailout(3, t1, t4, sb, t2, x, t3, i);
        if (x < 0 || x >= t4.length)
          throw $.ioore(x);
        sb.add$1(',' + $.S(t4[x]));
      }
  return sb.toString$0();
},
 toWSMessage$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      t4 = env2;
      t2 = env3;
      x = env4;
      t3 = env5;
      i = env6;
      break;
    case 3:
      t1 = env0;
      t4 = env1;
      sb = env2;
      t2 = env3;
      x = env4;
      t3 = env5;
      i = env6;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      sb.add$1('GAMECARD:');
      var t1 = this.fields;
    case 1:
      state = 0;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < 5))
                break L0;
              var t2 = i === 0;
              var t3 = i === 2;
              var x = 0;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(x < 5))
                        break L1;
                    default:
                      if (state === 2 || state === 0 && t2 && x === 0)
                        switch (state) {
                          case 0:
                            var t4 = $.index(t1, i);
                          case 2:
                            state = 0;
                            sb.add$1($.S($.index(t4, x)));
                        }
                      else
                        switch (state) {
                          case 0:
                          case 3:
                            if (state === 0 && t3 && x === 2)
                              ;
                            else
                              switch (state) {
                                case 0:
                                  t4 = $.index(t1, i);
                                case 3:
                                  state = 0;
                                  sb.add$1(',' + $.S($.index(t4, x)));
                              }
                        }
                      ++x;
                  }
              ++i;
          }
      return sb.toString$0();
  }
},
 Gamecard$fromServer$1: function(msg) {
  this.fields = $.ListImplementation_List(null, 'List<String>');
  this.initFields$0();
  msg = $.replaceFirst(msg, 'GAMECARD:', '');
  var liste = $.split(msg, ',');
  if (typeof liste !== 'string' && (typeof liste !== 'object' || liste === null || liste.constructor !== Array && !liste.is$JavaScriptIndexingBehavior()))
    return this.Gamecard$fromServer$1$bailout(1, msg, liste, 0, 0, 0, 0, 0);
  if (liste.length >= 24) {
    var t1 = this.fields;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.Gamecard$fromServer$1$bailout(2, t1, liste, 0, 0, 0, 0, 0);
    var count = 0;
    var x = 0;
    for (; x < 5; ++x)
      for (var t2 = x === 2, i = 0; i < 5; ++i)
        if (t2 && i === 2)
          ;
        else {
          if (x < 0 || x >= t1.length)
            throw $.ioore(x);
          var t3 = t1[x];
          if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior())
            return this.Gamecard$fromServer$1$bailout(3, x, t1, t2, t3, count, i, liste);
          if (count < 0 || count >= liste.length)
            throw $.ioore(count);
          var t5 = liste[count];
          if (i < 0 || i >= t3.length)
            throw $.ioore(i);
          t3[i] = t5;
          ++count;
        }
  } else
    $.print('Something is wrong with the server msg ' + $.S(msg));
},
 Gamecard$fromServer$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      msg = env0;
      liste = env1;
      break;
    case 2:
      t1 = env0;
      liste = env1;
      break;
    case 3:
      x = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      count = env4;
      i = env5;
      liste = env6;
      break;
  }
  switch (state) {
    case 0:
      this.fields = $.ListImplementation_List(null, 'List<String>');
      this.initFields$0();
      var msg = $.replaceFirst(msg, 'GAMECARD:', '');
      var liste = $.split(msg, ',');
    case 1:
      state = 0;
    default:
      if (state === 3 || state === 2 || state === 0 && $.geB($.get$length(liste), 24))
        switch (state) {
          case 0:
            var t1 = this.fields;
          case 2:
            state = 0;
            var count = 0;
            var x = 0;
          case 3:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    if (!(x < 5))
                      break L0;
                    var t2 = x === 2;
                    var i = 0;
                  case 3:
                    L1:
                      while (true)
                        switch (state) {
                          case 0:
                            if (!(i < 5))
                              break L1;
                          case 3:
                            if (state === 0 && t2 && i === 2)
                              ;
                            else
                              switch (state) {
                                case 0:
                                  var t3 = $.index(t1, x);
                                case 3:
                                  state = 0;
                                  $.indexSet(t3, i, $.index(liste, count));
                                  ++count;
                              }
                            ++i;
                        }
                    ++x;
                }
        }
      else
        $.print('Something is wrong with the server msg ' + $.S(msg));
  }
},
 Gamecard$0: function() {
  this.fields = $.ListImplementation_List(null, 'List<String>');
  this.initFields$0();
}
};

$$.RandomNumberGenerator = {"":
 ["addNumbers"],
 "super": "Object",
 getRandomNumber$0: function() {
  var random = $.Random_Random(null).nextInt$1(75);
  if (typeof random !== 'number')
    return this.getRandomNumber$0$bailout(1, random, 0, 0);
  var t1 = this.addNumbers;
  while (true) {
    if (!(random > 75))
      if (!(random < 1)) {
        var t2 = $.indexOf$1(t1, random);
        if (typeof t2 !== 'number')
          return this.getRandomNumber$0$bailout(2, random, t2, t1);
        t2 = t2 >= 0;
      } else
        t2 = true;
    else
      t2 = true;
    if (!t2)
      break;
    random = $.Random_Random(null).nextInt$1(75);
    if (typeof random !== 'number')
      return this.getRandomNumber$0$bailout(3, t1, random, 0);
  }
  t1.push(random);
  return random;
},
 getRandomNumber$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      random = env0;
      break;
    case 2:
      random = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 3:
      t1 = env0;
      random = env1;
      break;
  }
  switch (state) {
    case 0:
      var random = $.Random_Random(null).nextInt$1(75);
    case 1:
      state = 0;
      var t1 = this.addNumbers;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
            case 2:
              if (state === 2 || state === 0 && !$.gtB(random, 75))
                switch (state) {
                  case 0:
                  case 2:
                    if (state === 2 || state === 0 && !$.ltB(random, 1))
                      switch (state) {
                        case 0:
                          var t2 = $.indexOf$1(t1, random);
                        case 2:
                          state = 0;
                          t2 = $.geB(t2, 0);
                      }
                    else
                      t2 = true;
                }
              else
                t2 = true;
              if (!t2)
                break L0;
              random = $.Random_Random(null).nextInt$1(75);
            case 3:
              state = 0;
          }
      t1.push(random);
      return random;
  }
},
 RandomNumberGenerator$0: function() {
  this.addNumbers = $.ListImplementation_List(null, 'int');
}
};

$$._Default = {"":
 [],
 "super": "Object"
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_WorkerContextEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$keyPress: function() {
  return this.operator$index$1('keypress');
}
};

$$.FilteredElementList = {"":
 ["_node", "_childNodes"],
 "super": "Object",
 get$_filtered: function() {
  return $.ListImplementation_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
},
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2 !== null && t2.is$Element())
      return t2;
  }
  return;
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
},
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
},
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len))
    return;
  else if ($.ltB(newLength, 0))
    throw $.captureStackTrace($.CTC18);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
},
 add$1: function(value) {
  $.add$1(this._childNodes, value);
},
 get$add: function() { return new $.BoundClosure0(this, 'add$1'); },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
},
 addLast$1: function(value) {
  this.add$1(value);
},
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
},
 clear$0: function() {
  $.clear(this._childNodes);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    result.remove$0();
  return result;
},
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
},
 get$length: function() {
  return $.get$length(this.get$_filtered());
},
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
},
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return $.last(this.get$_filtered());
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildrenElementList = {"":
 ["_lib_element?", "_childElements"],
 "super": "Object",
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._toList$0$bailout(1, t1);
  var output = $.ListImplementation_List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var t2 = t1[i];
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 _toList$0$bailout: function(state, t1) {
  var output = $.ListImplementation_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 get$first: function() {
  return this._lib_element.get$$$dom_firstElementChild();
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
},
 isEmpty$0: function() {
  return this._lib_element.get$$$dom_firstElementChild() == null;
},
 get$length: function() {
  return $.get$length(this._childElements);
},
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
},
 operator$indexSet$2: function(index, value) {
  this._lib_element.$dom_replaceChild$2(value, $.index(this._childElements, index));
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC17);
},
 add$1: function(value) {
  this._lib_element.$dom_appendChild$1(value);
  return value;
},
 addLast$1: function(value) {
  return this.add$1(value);
},
 iterator$0: function() {
  return $.iterator(this._toList$0());
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._lib_element; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  this._lib_element.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._lib_element.$dom_removeChild$1(result);
  return result;
},
 last$0: function() {
  return this._lib_element.get$$$dom_lastElementChild();
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 "super": "Object",
 get$first: function() {
  return $.index(this._nodeList, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      out.add$1(t2);
  }
  return out;
},
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
},
 get$length: function() {
  return $.get$length(this._nodeList);
},
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC17);
},
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC17);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC17);
},
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC17);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC17);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC17);
},
 last$0: function() {
  return $.last(this._nodeList);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_lib_list", "_index"],
 "super": "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._lib_list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._index;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._index = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC2);
      var t1 = this._lib_list;
    case 1:
      state = 0;
      var t3 = this._index;
    case 2:
      state = 0;
      this._index = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 hasNext$0: function() {
  var t1 = this._index;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = $.get$length(this._lib_list);
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._index;
    case 1:
      state = 0;
      var t3 = $.get$length(this._lib_list);
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
}
};

$$._ElementList = {"":
 ["_lib_list"],
 "super": "_ListWrapper",
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1.call(this, f));
},
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$keyPress: function() {
  return this.operator$index$1('keypress');
}
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._EventsImpl = {"":
 ["_ptr"],
 "super": "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
}
};

$$._EventListenerListImpl = {"":
 ["_ptr", "_type"],
 "super": "Object",
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
},
 add$1: function(listener) {
  return this.add$2(listener,false)
},
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
},
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._HttpRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._HttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_IDBRequestEventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 "super": "Object",
 get$first: function() {
  return this._this.firstChild;
},
 first$0: function() { return this.get$first().call$0(); },
 last$0: function() {
  return this._this.lastChild;
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._this.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 "super": "Object",
 iterator$0: function() {
  return $.iterator(this._lib_list);
},
 forEach$1: function(f) {
  return $.forEach(this._lib_list, f);
},
 filter$1: function(f) {
  return $.filter(this._lib_list, f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._lib_list);
},
 get$length: function() {
  return $.get$length(this._lib_list);
},
 operator$index$1: function(index) {
  return $.index(this._lib_list, index);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._lib_list, index, value);
},
 set$length: function(newLength) {
  $.set$length(this._lib_list, newLength);
},
 add$1: function(value) {
  return $.add$1(this._lib_list, value);
},
 addLast$1: function(value) {
  return $.addLast(this._lib_list, value);
},
 addAll$1: function(collection) {
  return $.addAll(this._lib_list, collection);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib_list, element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  return $.clear(this._lib_list);
},
 removeLast$0: function() {
  return $.removeLast(this._lib_list);
},
 last$0: function() {
  return $.last(this._lib_list);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._lib_list, start, rangeLength);
},
 get$first: function() {
  return $.index(this._lib_list, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_lib_list"],
 "super": "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._lib_list, f));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._lib_list, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$keyPress: function() {
  return this.operator$index$1('keypress');
}
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$keyPress: function() {
  return this.operator$index$1('keypress');
},
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 "super": "_AbstractWorkerEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_array", "_pos"],
 "super": "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 "super": "Object",
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC2);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
}
};

$$.main_anon = {"":
 [],
 "super": "Closure",
 call$1: function(e) {
  if ($.contains$1($.toString(e.get$data()), 'CHAT:') !== true) {
    var t1 = $.S(e.get$data());
    $.query('#status').set$innerHTML(t1);
  }
  if (!($.handleMessage(e.get$data()) === ''))
    $._ws.send$1($.handleMessage(e.get$data()));
}
};

$$.addChatEventHandlers_anon = {"":
 [],
 "super": "Closure",
 call$1: function(event$) {
  if ($.eqB(event$.get$keyCode(), 13)) {
    $._ws.send$1('CHAT: <' + $.S($._nicknameInput.get$value()) + '> ' + $.S($._messageInput.get$value()));
    $.addMessageToMessageWindow(' <' + $.S($._nicknameInput.get$value()) + '> ' + $.S($._messageInput.get$value()));
    $._messageInput.set$value('');
  }
}
};

$$.addChatEventHandlers_anon0 = {"":
 [],
 "super": "Closure",
 call$1: function(event$) {
  if ($.eqB(event$.get$keyCode(), 13))
    ;
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 "super": "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$._convertDartToNative_PrepareForStructuredClone_findSlot = {"":
 ["copies_3", "values_2"],
 "super": "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_2);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
}
};

$$._convertDartToNative_PrepareForStructuredClone_readSlot = {"":
 ["copies_4"],
 "super": "Closure",
 call$1: function(i) {
  return $.index(this.copies_4, i);
}
};

$$._convertDartToNative_PrepareForStructuredClone_writeSlot = {"":
 ["copies_5"],
 "super": "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_5, i, x);
}
};

$$._convertDartToNative_PrepareForStructuredClone_cleanupSlots = {"":
 [],
 "super": "Closure",
 call$0: function() {
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk = {"":
 ["findSlot_8", "readSlot_7", "writeSlot_6"],
 "super": "Closure",
 call$1: function(e) {
  var t1 = {};
  if (e == null)
    return e;
  if (typeof e === 'boolean')
    return e;
  if (typeof e === 'number')
    return e;
  if (typeof e === 'string')
    return e;
  if (typeof e === 'object' && e !== null && !!e.is$Date)
    throw $.captureStackTrace($.CTC5);
  if (typeof e === 'object' && e !== null && !!e.is$RegExp)
    throw $.captureStackTrace($.CTC6);
  if (typeof e === 'object' && e !== null && e.is$_FileImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$File())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$Blob())
    throw $.captureStackTrace($.CTC8);
  if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$FileList())
    throw $.captureStackTrace($.CTC9);
  if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ImageData())
    throw $.captureStackTrace($.CTC9);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
    throw $.captureStackTrace($.CTC10);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
    throw $.captureStackTrace($.CTC11);
  if (typeof e === 'object' && e !== null && e.is$Map()) {
    var slot = this.findSlot_8.call$1(e);
    t1.copy_1 = this.readSlot_7.call$1(slot);
    var t2 = t1.copy_1;
    if (!(t2 == null))
      return t2;
    t1.copy_1 = {};
    this.writeSlot_6.call$2(slot, t1.copy_1);
    e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
    return t1.copy_1;
  }
  if (typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List())) {
    if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, e, 0, 0, 0, 0, 0);
    var length$ = e.length;
    slot = this.findSlot_8.call$1(e);
    var copy = this.readSlot_7.call$1(slot);
    if (!(copy == null)) {
      if (true === copy) {
        copy = new Array(length$);
        this.writeSlot_6.call$2(slot, copy);
      }
      return copy;
    }
    if (e instanceof Array && !!!(e.immutable$list)) {
      this.writeSlot_6.call$2(slot, true);
      for (var i = 0; i < length$; ++i) {
        if (i < 0 || i >= e.length)
          throw $.ioore(i);
        var element = e[i];
        var elementCopy = this.call$1(element);
        if (!(elementCopy == null ? element == null : elementCopy === element)) {
          copy = this.readSlot_7.call$1(slot);
          if (true === copy) {
            copy = new Array(length$);
            this.writeSlot_6.call$2(slot, copy);
          }
          if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
            return this.call$1$bailout(2, copy, elementCopy, e, length$, i, slot);
          for (var j = 0; j < i; ++j) {
            if (j < 0 || j >= e.length)
              throw $.ioore(j);
            t1 = e[j];
            if (j < 0 || j >= copy.length)
              throw $.ioore(j);
            copy[j] = t1;
          }
          if (i < 0 || i >= copy.length)
            throw $.ioore(i);
          copy[i] = elementCopy;
          ++i;
          break;
        }
      }
      if (copy == null) {
        this.writeSlot_6.call$2(slot, e);
        copy = e;
      }
    } else {
      copy = new Array(length$);
      this.writeSlot_6.call$2(slot, copy);
      i = 0;
    }
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(3, i, copy, e, length$, 0, 0);
    for (; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= copy.length)
        throw $.ioore(i);
      copy[i] = t1;
    }
    return copy;
  }
  throw $.captureStackTrace($.CTC12);
},
 call$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      copy = env0;
      elementCopy = env1;
      e = env2;
      length$ = env3;
      i = env4;
      slot = env5;
      break;
    case 3:
      i = env0;
      copy = env1;
      e = env2;
      length$ = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = {};
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (typeof e === 'object' && e !== null && !!e.is$Date)
        throw $.captureStackTrace($.CTC5);
      if (typeof e === 'object' && e !== null && !!e.is$RegExp)
        throw $.captureStackTrace($.CTC6);
      if (typeof e === 'object' && e !== null && e.is$_FileImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$File())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$Blob())
        throw $.captureStackTrace($.CTC8);
      if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$FileList())
        throw $.captureStackTrace($.CTC9);
      if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ImageData())
        throw $.captureStackTrace($.CTC9);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
        throw $.captureStackTrace($.CTC10);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
        throw $.captureStackTrace($.CTC11);
      if (typeof e === 'object' && e !== null && e.is$Map()) {
        var slot = this.findSlot_8.call$1(e);
        t1.copy_1 = this.readSlot_7.call$1(slot);
        var t2 = t1.copy_1;
        if (!(t2 == null))
          return t2;
        t1.copy_1 = {};
        this.writeSlot_6.call$2(slot, t1.copy_1);
        e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
        return t1.copy_1;
      }
    default:
      if (state === 3 || state === 2 || state === 1 || state === 0 && typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            var length$ = $.get$length(e);
            slot = this.findSlot_8.call$1(e);
            var copy = this.readSlot_7.call$1(slot);
            if (!(copy == null)) {
              if (true === copy) {
                copy = new Array(length$);
                this.writeSlot_6.call$2(slot, copy);
              }
              return copy;
            }
          case 2:
            if (state === 2 || state === 0 && e instanceof Array && !!!(e.immutable$list))
              switch (state) {
                case 0:
                  this.writeSlot_6.call$2(slot, true);
                  var i = 0;
                case 2:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          if (!$.ltB(i, length$))
                            break L0;
                          var element = $.index(e, i);
                          var elementCopy = this.call$1(element);
                        case 2:
                          if (state === 2 || state === 0 && !(elementCopy == null ? element == null : elementCopy === element))
                            switch (state) {
                              case 0:
                                copy = this.readSlot_7.call$1(slot);
                                if (true === copy) {
                                  copy = new Array(length$);
                                  this.writeSlot_6.call$2(slot, copy);
                                }
                              case 2:
                                state = 0;
                                for (var j = 0; j < i; ++j)
                                  $.indexSet(copy, j, $.index(e, j));
                                $.indexSet(copy, i, elementCopy);
                                ++i;
                                break L0;
                            }
                          ++i;
                      }
                  if (copy == null) {
                    this.writeSlot_6.call$2(slot, e);
                    copy = e;
                  }
              }
            else {
              copy = new Array(length$);
              this.writeSlot_6.call$2(slot, copy);
              i = 0;
            }
          case 3:
            state = 0;
            for (; $.ltB(i, length$); ++i)
              $.indexSet(copy, i, this.call$1($.index(e, i)));
            return copy;
        }
      throw $.captureStackTrace($.CTC12);
  }
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk_anon = {"":
 ["walk_9", "box_0"],
 "super": "Closure",
 call$2: function(key, value) {
  this.box_0.copy_1[key] = this.walk_9.call$1(value);
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 "super": "Closure",
 call$0: function() {
  return this.closure_0.call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 "super": "Closure",
 call$0: function() {
  return this.closure_2.call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 "super": "Closure",
 call$0: function() {
  return this.closure_5.call$2(this.arg1_4, this.arg2_3);
}
};

$$._convertNativeToDart_AcceptStructuredClone_findSlot = {"":
 ["copies_1", "values_0"],
 "super": "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_0);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
}
};

$$._convertNativeToDart_AcceptStructuredClone_readSlot = {"":
 ["copies_2"],
 "super": "Closure",
 call$1: function(i) {
  return $.index(this.copies_2, i);
}
};

$$._convertNativeToDart_AcceptStructuredClone_writeSlot = {"":
 ["copies_3"],
 "super": "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_3, i, x);
}
};

$$._convertNativeToDart_AcceptStructuredClone_walk = {"":
 ["findSlot_6", "readSlot_5", "writeSlot_4"],
 "super": "Closure",
 call$1: function(e) {
  if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
    return this.call$1$bailout(1, e, 0, 0);
  if (e instanceof Date)
    throw $.captureStackTrace($.CTC5);
  if (e instanceof RegExp)
    throw $.captureStackTrace($.CTC6);
  if ($._isJavaScriptSimpleObject(e)) {
    var slot = this.findSlot_6.call$1(e);
    var copy = this.readSlot_5.call$1(slot);
    if (!(copy == null))
      return copy;
    copy = $.makeLiteralMap([]);
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(2, e, slot, copy);
    this.writeSlot_4.call$2(slot, copy);
    for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      var t3 = this.call$1(e[t2]);
      if (t2 !== (t2 | 0))
        throw $.iae(t2);
      if (t2 < 0 || t2 >= copy.length)
        throw $.ioore(t2);
      copy[t2] = t3;
    }
    return copy;
  }
  if (e instanceof Array) {
    slot = this.findSlot_6.call$1(e);
    copy = this.readSlot_5.call$1(slot);
    if (!(copy == null))
      return copy;
    this.writeSlot_4.call$2(slot, e);
    var length$ = e.length;
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      e[i] = t1;
    }
    return e;
  }
  return e;
},
 call$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      e = env0;
      slot = env1;
      copy = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (e instanceof Date)
        throw $.captureStackTrace($.CTC5);
      if (e instanceof RegExp)
        throw $.captureStackTrace($.CTC6);
    case 2:
      if (state === 2 || state === 0 && $._isJavaScriptSimpleObject(e))
        switch (state) {
          case 0:
            var slot = this.findSlot_6.call$1(e);
            var copy = this.readSlot_5.call$1(slot);
            if (!(copy == null))
              return copy;
            copy = $.makeLiteralMap([]);
          case 2:
            state = 0;
            this.writeSlot_4.call$2(slot, copy);
            for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
              var t2 = t1.next$0();
              $.indexSet(copy, t2, this.call$1(e[t2]));
            }
            return copy;
        }
      if (e instanceof Array) {
        slot = this.findSlot_6.call$1(e);
        copy = this.readSlot_5.call$1(slot);
        if (!(copy == null))
          return copy;
        this.writeSlot_4.call$2(slot, e);
        var length$ = $.get$length(e);
        for (var i = 0; $.ltB(i, length$); ++i)
          $.indexSet(e, i, this.call$1($.index(e, i)));
        return e;
      }
      return e;
  }
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 "super": "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 "super": "Closure",
 call$1: function(entry) {
  this.f_0.call$2(entry.get$key(), entry.get$value());
}
};

$$._convertNativeToDart_IDBKey_containsDate = {"":
 [],
 "super": "Closure",
 call$1: function(object) {
  if (object instanceof Date)
    return true;
  if (typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List())) {
    if (typeof object !== 'object' || object === null || object.constructor !== Array && !object.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, object);
    for (var i = 0; t1 = object.length, i < t1; ++i) {
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      if (this.call$1(object[i]) === true)
        return true;
    }
  }
  return false;
  var t1;
},
 call$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      var object = env0;
      break;
  }
  switch (state) {
    case 0:
      if (object instanceof Date)
        return true;
    case 1:
      if (state === 1 || state === 0 && typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            for (var i = 0; $.ltB(i, $.get$length(object)); ++i)
              if (this.call$1($.index(object, i)) === true)
                return true;
        }
      return false;
  }
}
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 "super": "Closure",
 call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
}
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 "super": "Closure",
 call$1: function(element) {
  if (this.f_1.call$1(element) === true)
    $.add$1(this.output_0, element);
}
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 "super": "Closure",
 call$1: function(el) {
  return el.remove$0();
}
};

$$.addCellClickHandlers_anon = {"":
 ["el_4", "box_0", "box_2"],
 "super": "Closure",
 call$1: function(event2) {
  if ($.eqB($.toString($._currentNumber), this.el_4.get$innerHTML())) {
    $.print('muh');
    this.el_4.get$style().set$textDecoration('underline');
    this.el_4.get$style().set$backgroundColor('red');
    $.indexSet($.index($.playercard.get$fields(), this.box_2.i_3), this.box_0.x_1, '0');
  }
}
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 "super": "Closure",
 call$1: function(n) {
  var absN = $.abs(n);
  var sign = $.ltB(n, 0) ? '-' : '';
  if ($.geB(absN, 1000))
    return $.S(n);
  if ($.geB(absN, 100))
    return sign + '0' + $.S(absN);
  if ($.geB(absN, 10))
    return sign + '00' + $.S(absN);
  return sign + '000' + $.S(absN);
}
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 "super": "Closure",
 call$1: function(n) {
  if ($.geB(n, 100))
    return $.S(n);
  if ($.geB(n, 10))
    return '0' + $.S(n);
  return '00' + $.S(n);
}
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 "super": "Closure",
 call$1: function(n) {
  if ($.geB(n, 10))
    return $.S(n);
  return '0' + $.S(n);
}
};

$$.Closure = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.addChatEventHandlers = function() {
  $._messageInput = $.query('#message');
  $._nicknameInput = $.query('#nickname');
  $.query('#messagewindow');
  $.add$1($._messageInput.get$on().get$keyPress(), new $.addChatEventHandlers_anon());
  $.add$1($._nicknameInput.get$on().get$keyPress(), new $.addChatEventHandlers_anon0());
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$._convertNativeToDart_AcceptStructuredClone = function(object) {
  var values = [];
  var copies = [];
  return new $._convertNativeToDart_AcceptStructuredClone_walk(new $._convertNativeToDart_AcceptStructuredClone_findSlot(copies, values), new $._convertNativeToDart_AcceptStructuredClone_readSlot(copies), new $._convertNativeToDart_AcceptStructuredClone_writeSlot(copies)).call$1(object);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$._isJavaScriptSimpleObject = function(value) {
  return Object.getPrototypeOf(value) === Object.prototype;
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.GameHandler = function(gameevent) {
  if ($._first !== true) {
    if ($._gameStarted !== true)
      if ($.eqB($.query('#startGame').get$text(), 'I\'m ready!')) {
        $._ws.send$1('client ready');
        $.query('#startGame').set$value('I\'m not ready!');
        $.query('#getGamecard').get$on().get$click().remove$1($.GamecardHandler);
      } else {
        $._ws.send$1('client notready');
        $.query('#startGame').set$value('I\'m ready!');
        $.add$1($.query('#getGamecard').get$on().get$click(), $.GamecardHandler);
      }
  } else
    $.document().query$1('#status').set$innerHTML('Get some Gamecards first!');
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DateImplementation$now = function() {
  var t1 = new $.DateImplementation($.Primitives_dateNow(), false);
  t1.DateImplementation$now$0();
  return t1;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_pattern, _errmsg);
};

$.handleMessage = function(msg) {
  if ($.eqB(msg, 'Hello from Server!'))
    return 'client hello!';
  if ($.contains$1(msg, 'GAMECARD:') === true) {
    $.print('received: ' + $.S(msg));
    $.playercard = $.Gamecard$fromServer(msg);
    var t1 = $.playercard.createCardHTML$1(false);
    $.query('#playertable').set$innerHTML(t1);
    $.addCellClickHandlers();
    $.document().query$1('#status').set$innerHTML('Gamecard created!');
    $._first = false;
  }
  if ($.contains$1(msg, 'Other Players:') === true) {
    $.document().query$1('#status').set$innerHTML(msg);
    return '';
  }
  if ($.contains$1(msg, 'CHAT:') === true) {
    $.addMessageToMessageWindow($.replaceFirst(msg, 'CHAT:', ''));
    return '';
  }
  if ($.contains$1(msg, 'Starting the Game') === true) {
    $._gameStarted = true;
    $.query('#startGame').get$on().get$click().remove$1($.GameHandler);
    $.query('#startGame').set$hidden(true);
    $.query('#getGamecard').set$hidden(true);
    return '';
  }
  if ($.contains$1(msg, 'Number') === true && $.contains$1(msg, 'of') !== true) {
    $._currentNumber = $.replaceAll(msg, 'Number: ', '');
    if ($._debug === true)
      for (var i = 0; i < 5; ++i)
        for (var t1 = i === 2, x = 0; x < 5; ++x)
          if (t1 && x === 2)
            ;
          else {
            var el = $.document().query$1('#p' + $.S(i) + $.S(x));
            if ($.eqB($.toString($._currentNumber), $.toString(el.get$innerHTML()))) {
              el.get$style().set$backgroundColor('red');
              $.indexSet($.index($.playercard.get$fields(), i), x, '0');
            }
          }
    return '';
  }
  if ($.contains$1(msg, 'Player has Bingo. Game stopped.') === true) {
    $._gameStarted = false;
    $.query('#Bingo').set$value('New Round');
    if ($.playercard.checkBingo$0() === true && $._bingoSent === true)
      $.document().query$1('#status').set$innerHTML('Bingo! You win this round!');
    else
      $.document().query$1('#status').set$innerHTML('Other Player has Bingo. Round ended.');
    return '';
  }
  return '';
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document') {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'HTMLDDElement')
    return 'HTMLElement';
  if (name$ === 'HTMLDTElement')
    return 'HTMLElement';
  if (name$ === 'HTMLTableDataCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLTableHeaderCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLPhraseElement')
    return 'HTMLElement';
  if (name$ === 'MSStyleCSSProperties')
    return 'CSSStyleDeclaration';
  if (name$ === 'MouseWheelEvent')
    return 'WheelEvent';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.DoubleLinkedQueueEntry$ = function(e, E) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof name$ === 'string')
      var t1 = !(name$ === '') && !(name$ === 'Object') && !(name$ === 'Function.prototype');
    else
      t1 = false;
    if (t1)
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return string.substring(8, string.length - 1);
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(functionName, arguments$);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.replaceFirst = function(receiver, from, to) {
  if (!(typeof receiver === 'string'))
    return receiver.replaceFirst$2(from, to);
  $.checkString(to);
  return $.stringReplaceFirstUnchecked(receiver, from, to);
};

$.JSSyntaxRegExp$ = function(pattern, multiLine, ignoreCase) {
  return new $.JSSyntaxRegExp(ignoreCase, multiLine, pattern);
};

$.typeNameInChrome = function(obj) {
  var name$ = obj.constructor.name;
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.stringReplaceFirstUnchecked = function(receiver, from, to) {
  return $.stringReplaceJS(receiver, from, to);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.stringReplaceAllUnchecked = function(receiver, from, to) {
  if (from === '')
    if (receiver === '')
      return to;
    else {
      var result = $.StringBufferImpl$('');
      var length$ = receiver.length;
      result.add$1(to);
      for (var i = 0; i < length$; ++i) {
        if (i < 0 || i >= length$)
          throw $.ioore(i);
        result.add$1(receiver[i]);
        result.add$1(to);
      }
      return result.toString$0();
    }
  else
    return $.stringReplaceJS(receiver, $.regExpMakeNative($.JSSyntaxRegExp$(from.replace($.regExpMakeNative($.CTC19, true), "\\$&"), false, false), true), to);
};

$.ObjectImplementation_toStringImpl = function(object) {
  return $.Primitives_objectToString(object);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return new $.invokeClosure_anon(closure).call$0();
  else if ($.eqB(numberOfArguments, 1))
    return new $.invokeClosure_anon0(closure, arg1).call$0();
  else if ($.eqB(numberOfArguments, 2))
    return new $.invokeClosure_anon1(closure, arg1, arg2).call$0();
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$.last = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.buildDynamicMetadata = function(inputTable) {
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var tag = inputTable[i][0];
    var array = inputTable[i];
    var tags = array[1];
    var set = {};
    var tagNames = tags.split('|');
    for (var j = 0, index = 1; j < tagNames.length; ++j) {
      $.propertySet(set, tagNames[j], true);
      index = j;
      array = tagNames;
    }
    result.push($.MetaInfo$(tag, tags, set));
  }
  return result;
};

$.propertySet = function(object, property, value) {
  object[property] = value;
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$._convertNativeToDart_IDBKey = function(nativeKey) {
  if (new $._convertNativeToDart_IDBKey_containsDate().call$1(nativeKey) === true)
    throw $.captureStackTrace($.CTC16);
  return nativeKey;
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$._WebSocketFactoryProvider_WebSocket = function(url) {
return new WebSocket(url);
};

$.Primitives_getDay = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCDate() : $.Primitives_lazyAsJsDate(receiver).getDate();
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  return receiver.split(pattern);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.RandomNumberGenerator$ = function() {
  var t1 = new $.RandomNumberGenerator(null);
  t1.RandomNumberGenerator$0();
  return t1;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMinutes() : $.Primitives_lazyAsJsDate(receiver).getMinutes();
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.Primitives_getMonth = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMonth() + 1 : $.Primitives_lazyAsJsDate(receiver).getMonth() + 1;
};

$.contains = function(userAgent, name$) {
  return !(userAgent.indexOf(name$) === -1);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  return !($.indexOf$2(receiver, other, startIndex) === -1);
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
return window;
};

$.addCellClickHandlers = function() {
  $.print('muh');
  var box_2 = {};
  for (box_2.i_3 = 0; $.ltB(box_2.i_3, 5); box_20 = {}, box_20.i_3 = box_2.i_3, box_20.i_3 = $.add(box_20.i_3, 1), box_2 = box_20) {
    var box_0 = {};
    for (box_0.x_1 = 0; $.ltB(box_0.x_1, 5); box_00 = {}, box_00.x_1 = box_0.x_1, box_00.x_1 = $.add(box_00.x_1, 1), box_0 = box_00)
      if ($.eqB(box_2.i_3, 2) && $.eqB(box_0.x_1, 2))
        ;
      else {
        var el = $.query('#p' + $.S(box_2.i_3) + $.S(box_0.x_1));
        $.add$1(el.get$on().get$click(), new $.addCellClickHandlers_anon(el, box_0, box_2));
      }
  }
  var box_20, box_00;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.BingoHandler = function(bingoevent) {
  if ($.contains$1($.document().query$1('#Bingo').get$value(), 'Bingo!') === true)
    if ($._gameStarted !== true)
      $.document().query$1('#status').set$innerHTML('The Game hasn\'t started yet or already ended!');
    else if ($.playercard.checkBingo$0() === true) {
      $._ws.send$1('THISISBINGO:' + $.S($.playercard.toWSMessage$0()));
      $._bingoSent = true;
      $.document().query$1('#status').set$innerHTML('Bingo sent to server');
    } else
      $.document().query$1('#status').set$innerHTML('You don\'t have a Bingo!');
  if ($.contains$1($.query('#Bingo').get$value(), 'New Round') === true) {
    $.query('#Bingo').set$value('Bingo!');
    $.add$1($.query('#startGame').get$on().get$click(), $.GameHandler);
    $.query('#startGame').set$hidden(false);
    $.query('#startGame').set$value('I\'m ready!');
    $.query('#getGamecard').set$hidden(false);
    $.add$1($.query('#getGamecard').get$on().get$click(), $.GamecardHandler);
    $.playercard = $.Gamecard$();
    var t1 = $.playercard.createCardHTML$1(false);
    $.query('#playertable').set$innerHTML(t1);
  }
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global)
    $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, String(e)));
  }

};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(_list, 0);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.Primitives_lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0))
    receiver.date = new Date(receiver.millisecondsSinceEpoch);
  return receiver.date;
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.stringReplaceJS = function(receiver, replacer, to) {
  return receiver.replace(replacer, to.replace('$', '$$$$'));
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.replaceAll = function(receiver, from, to) {
  if (!(typeof receiver === 'string'))
    return receiver.replaceAll$2(from, to);
  $.checkString(to);
  return $.stringReplaceAllUnchecked(receiver, from, to);
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.Primitives_getYear = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCFullYear() : $.Primitives_lazyAsJsDate(receiver).getFullYear();
};

$._ElementFactoryProvider_Element$tag = function(tag) {
return document.createElement(tag)
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$.ListImplementation_List$from = function(other, E) {
  var result = $.ListImplementation_List(null);
  for (var t1 = $.iterator(other); t1.hasNext$0() === true;)
    result.push(t1.next$0());
  return result;
};

$.getRuntimeTypeInfo = function(target) {
  if (target == null)
    return;
  var res = target.builtin$typeInfo;
  return res == null ? {} : res;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.add$1($.query('#getGamecard').get$on().get$click(), $.GamecardHandler);
  $.add$1($.query('#startGame').get$on().get$click(), $.GameHandler);
  $.add$1($.query('#Bingo').get$on().get$click(), $.BingoHandler);
  $._messageWindow = $.query('#messagewindow');
  $._messageWindow.set$value('');
  $.document().query$1('#status').set$innerHTML('Welcome to Bingo');
  $._ws = $._WebSocketFactoryProvider_WebSocket('ws://localhost:8080/bingo');
  $.add$1($._ws.get$on().get$message(), new $.main_anon());
  $.addChatEventHandlers();
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._convertDartToNative_SerializedScriptValue = function(value) {
  return $._convertDartToNative_PrepareForStructuredClone(value);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$.truncate = function(receiver) {
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element, element.get$$$dom_children());
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$._convertDartToNative_PrepareForStructuredClone = function(value) {
  var values = [];
  var copies = [];
  var t1 = new $._convertDartToNative_PrepareForStructuredClone_findSlot(copies, values);
  var t2 = new $._convertDartToNative_PrepareForStructuredClone_readSlot(copies);
  var t3 = new $._convertDartToNative_PrepareForStructuredClone_writeSlot(copies);
  var t4 = new $._convertDartToNative_PrepareForStructuredClone_cleanupSlots();
  var copy = new $._convertDartToNative_PrepareForStructuredClone_walk(t1, t2, t3).call$1(value);
  t4.call$0();
  return copy;
};

$.endsWith = function(receiver, other) {
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = other.length;
  if (otherLength > receiverLength)
    return false;
  return other === $.substring$1(receiver, receiverLength - otherLength);
};

$.Primitives_getMilliseconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds() : $.Primitives_lazyAsJsDate(receiver).getMilliseconds();
};

$.ListIterator$ = function(list, T) {
  var t1 = new $.ListIterator(0, list);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$.addLast = function(receiver, value) {
  if (!$.isJsArray(receiver))
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node, node.get$nodes());
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $, arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$._FixedSizeListIterator$ = function(array, T) {
  var t1 = new $._FixedSizeListIterator($.get$length(array), array, 0);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel, E) {
  var t1 = new $._DoubleLinkedQueueIterator(_sentinel, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.getRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number')
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if (end > a.length)
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    accumulator.push(a[i]);
  }
  return accumulator;
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function(K, V) {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.Random_Random = function(seed) {
  return $.CTC13;
};

$.regExpGetNative = function(regExp) {
  var r = regExp._re;
  return r == null ? regExp._re = $.regExpMakeNative(regExp, false) : r;
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC0));
  return object;
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_ptr, _type);
};

$.Primitives_getSeconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCSeconds() : $.Primitives_lazyAsJsDate(receiver).getSeconds();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function(E) {
  var t1 = new $.DoubleLinkedQueue(null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function(E) {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.Primitives_getHours = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCHours() : $.Primitives_lazyAsJsDate(receiver).getHours();
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.GamecardHandler = function(gamecardevent) {
  $.playercard = $.Gamecard$();
  $._ws.send$1('getGamecard');
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._HttpRequestEventsImpl$ = function(_ptr) {
  return new $._HttpRequestEventsImpl(_ptr);
};

$.StringImplementation__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringImplementation__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.Gamecard$fromServer = function(msg) {
  var t1 = new $.Gamecard(null, null);
  t1.Gamecard$fromServer$1(msg);
  return t1;
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.KeyValuePair$ = function(key, value, K, V) {
  var t1 = new $.KeyValuePair(key, value);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  return t1;
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(_tag, _tags, _set) {
  return new $.MetaInfo(_tag, _tags, _set);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC21)[name$];
  if (!(dartMethod == null))
    $.propertySet(methods, 'Object', dartMethod);
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$.print = function(object) {
  $.PrintImplementation_print(object);
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.PrintImplementation_print = function(obj) {
  $.Primitives_printString(obj);
};

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch, isUtc) {
  var t1 = new $.DateImplementation(millisecondsSinceEpoch, isUtc);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.addAll = function(receiver, collection) {
  if (!$.isJsArray(receiver))
    return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true;)
    $.add$1(receiver, iterator.next$0());
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document')
    return 'HTMLDocument';
  if (name$ === 'XMLDocument')
    return 'Document';
  if (name$ === 'WorkerMessageEvent')
    return 'MessageEvent';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.Gamecard$ = function() {
  var t1 = new $.Gamecard(null, null);
  t1.Gamecard$0();
  return t1;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = receiver.length;
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + receiver.charCodeAt(i);
    var hash1 = 536870911 & hash0 + 524287 & hash0 << 10;
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + 67108863 & hash << 3;
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + 16383 & hash0 << 15;
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.startsWith = function(receiver, other) {
  $.checkString(other);
  var length$ = other.length;
  if (length$ > receiver.length)
    return false;
  return other == receiver.substring(0, length$);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.getTypeNameOf(obj);
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; i < $._dynamicMetadata0().length; ++i) {
      var entry = $._dynamicMetadata0()[i];
      if (entry.get$_set()[tag]) {
        method = methods[entry.get$_tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
return document;
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains(userAgent, 'Chrome') || $.contains(userAgent, 'DumpRenderTree'))
    return $.typeNameInChrome;
  else if ($.contains(userAgent, 'Firefox'))
    return $.typeNameInFirefox;
  else if ($.contains(userAgent, 'MSIE'))
    return $.typeNameInIE;
  else if ($.contains(userAgent, 'Opera'))
    return $.typeNameInOpera;
  else if ($.contains(userAgent, 'Safari'))
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.ListImplementation_List = function(length$, E) {
  return $.Primitives_newList(length$);
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC1;
  var jsError = new Error();
  jsError.name = ex;
  jsError.description = ex;
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver))
    return $.Arrays_indexOf(receiver, element, 0, receiver.length);
  else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.indexOf(element);
  }
  return receiver.indexOf$1(element);
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$ = function(K, V) {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  t1.HashMapImplementation$0();
  return t1;
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.addMessageToMessageWindow = function(msg) {
  var time = $.S($.DateImplementation$now());
  var time0 = $.index($.split($.substring$1(time, $.add($.indexOf$1(time, ' '), 1)), '.'), 0);
  if ($.eqB($._messageWindow.get$value(), '')) {
    var t1 = '[' + $.S(time0) + ']' + $.S(msg);
    $._messageWindow.set$value(t1);
  } else {
    t1 = $.S($._messageWindow.get$value()) + '\n[' + $.S(time0) + ']' + $.S(msg);
    $._messageWindow.set$value(t1);
  }
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.document = function() {
return document;
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(_receiver, _functionName, _arguments, existingArgumentNames);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex)
    return ex.dartException;
  var message = ex.message;
  if (ex instanceof TypeError) {
    var type = ex.type;
    var name$ = ex.arguments ? ex.arguments[0] : "";
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC0);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    var ieErrorCode = ex.number & 0xffff;
    var ieFacilityNumber = ex.number>>16 & 0x1FFF;
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC0);
      else {
        if ($.contains$1(message, ' is not a function') !== true)
          var t1 = ieErrorCode === 438 && ieFacilityNumber === 10;
        else
          t1 = true;
        if (t1)
          return $.NoSuchMethodException$('', '<unknown>', [], null);
      }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError)
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.ceil = function(receiver) {
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$._HttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._HttpRequestUploadEventsImpl(_ptr);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$._Lists_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i)
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1))
    accumulator.push($.index(a, i));
  return accumulator;
};

$.StringImplementation__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$.GamecardHandler.call$1 = $.GamecardHandler;
$.GamecardHandler.$name = "GamecardHandler";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.BingoHandler.call$1 = $.BingoHandler;
$.BingoHandler.$name = "BingoHandler";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.GameHandler.call$1 = $.GameHandler;
$.GameHandler.$name = "GameHandler";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC0 = Isolate.makeConstantList([]);
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot add to immutable List.');
$.CTC16 = new Isolate.$isolateProperties.NotImplementedException('IDBKey containing Date');
$.CTC14 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC17 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC8 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Blob');
$.CTC15 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC13 = new Isolate.$isolateProperties._Random();
$.CTC21 = new Isolate.$isolateProperties.Object();
$.CTC18 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException('structured clone of FileList');
$.CTC12 = new Isolate.$isolateProperties.NotImplementedException('structured clone of other type');
$.CTC19 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '[-[\\]{}()*+?.,\\\\^$|#\\s]');
$.CTC10 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBuffer');
$.CTC11 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBufferView');
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Date');
$.CTC20 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC3 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeLast on immutable List.');
$.CTC7 = new Isolate.$isolateProperties.NotImplementedException('structured clone of File');
$.CTC4 = new Isolate.$isolateProperties._Default();
$.CTC1 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC0);
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException('structured clone of RegExp');
$._gameStarted = false;
$._first = true;
$._bingoSent = false;
$.Primitives_DOLLAR_CHAR_VALUE = 36;
$._messageWindow = null;
$._ws = null;
$._getTypeNameOf = null;
$.playercard = null;
$._cachedBrowserPrefix = null;
$._debug = false;
$._nicknameInput = null;
$._messageInput = null;
$._currentNumber = '42';
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter =   function(field, prototype) {
    var len = field.length;
    var lastChar = field[len - 1];
    var needsGetter = lastChar == '?' || lastChar == '=';
    var needsSetter = lastChar == '!' || lastChar == '=';
    if (needsGetter || needsSetter) field = field.substring(0, len - 1);
    if (needsGetter) {
      var getterString = "return this." + field + ";";
        prototype["get$" + field] = new Function(getterString);
    }
    if (needsSetter) {
      var setterString = "this." + field + " = v;";
      prototype["set$" + field] = new Function("v", setterString);
    }
    return field;
  };
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$FileList: function() { return false; },
 is$_FileImpl: function() { return false; },
 is$Element: function() { return false; },
 is$_ImageDataImpl: function() { return false; },
 is$_BlobImpl: function() { return false; },
 is$ArrayBuffer: function() { return false; },
 is$_ArrayBufferViewImpl: function() { return false; },
 is$Collection: function() { return false; },
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$_FileListImpl: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$ImageData: function() { return false; },
 is$ArrayBufferView: function() { return false; },
 is$List: function() { return false; },
 is$_ArrayBufferImpl: function() { return false; },
 is$Map: function() { return false; },
 is$File: function() { return false; },
 is$Blob: function() { return false; }
});

$.$defineNativeClass('AbstractWorker', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._AbstractWorkerEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return this.toString();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ArrayBuffer', [], {
 is$_ArrayBufferImpl: function() { return true; },
 is$ArrayBuffer: function() { return true; }
});

$.$defineNativeClass('ArrayBufferView', [], {
 is$_ArrayBufferViewImpl: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Blob', [], {
 is$_BlobImpl: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CSSFontFaceRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframeRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSPageRule', ["style?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
},
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
},
 set$backgroundColor: function(value) {
  this.setProperty$3('background-color', value, '');
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 set$textDecoration: function(value) {
  this.setProperty$3('text-decoration', value, '');
}
});

$.$defineNativeClass('CSSStyleRule', ["style?"], {
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["data?", "length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('CompositionEvent', ["data?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('DOMException', ["message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'String');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 contains$1: function(string) {
  return this.contains(string);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 add$1: function(token) {
  return this.add(token);
},
 contains$1: function(token) {
  return this.contains(token);
},
 remove$1: function(token) {
  return this.remove(token);
},
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLDataListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('DataView', [], {
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 get$on: function() {
  return $._DocumentEventsImpl$(this);
},
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 query$1: function(selectors) {
  if ($.CTC20.hasMatch$1(selectors) === true)
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 get$elements: function() {
  if (this._elements == null)
    this._elements = $.FilteredElementList$(this);
  return this._elements;
},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$innerHTML: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$innerHTML')) {
  {
  var e = $._ElementFactoryProvider_Element$tag('div');
  $.add$1(e.get$nodes(), this.clone$1(true));
  return e.get$innerHTML();
}
  } else {
    return Object.prototype.get$innerHTML.call(this);
  }

},
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
  {
  $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListImplementation_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
}
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }

},
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
},
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
},
 get$parent: function() {
  return;
},
 get$style: function() {
  return $._ElementFactoryProvider_Element$tag('div').get$style();
},
 click$0: function() {
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 set$hidden: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Hidden can\'t be set for document fragments.'));
},
 get$on: function() {
  return $._ElementEventsImpl$(this);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Element', ["hidden!", "innerHTML=", "style?"], {
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
  {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
}
  } else {
    return Object.prototype.set$elements.call(this, value);
  }

},
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
  {
  return $._ChildrenElementList$_wrap(this);
}
  } else {
    return Object.prototype.get$elements.call(this);
  }

},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._ElementEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 get$$$dom_children: function() {
return this.children;
},
 click$0: function() {
  return this.click();
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 get$$$dom_firstElementChild: function() {
return this.firstElementChild;
},
 get$$$dom_lastElementChild: function() {
return this.lastElementChild;
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', [], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
}
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('EventException', ["message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('EventSource', [], {
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('EventTarget', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._EventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('HTMLFieldSetElement', ["elements?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', [], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('FileException', ["message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'File');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$_FileListImpl: function() { return true; },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$FileList: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriter', ["length?"], {
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'num');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'num');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 get$length: function() {
return this.length;
},
 set$length: function(value) {
this.length = value;
},
 remove$1: function(index) {
  return this.remove(index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('XMLHttpRequest', [], {
 get$on: function() {
  return $._HttpRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 send$1: function(data) {
  return this.send(data);
}
});

$.$defineNativeClass('XMLHttpRequestException', ["message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 get$on: function() {
  return $._HttpRequestUploadEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBCursor', [], {
 get$key: function() {
  return $._convertNativeToDart_IDBKey(this.get$_key());
},
 get$_key: function() {
return this.key;
}
});

$.$defineNativeClass('IDBCursorWithValue', [], {
 get$value: function() {
  return $._convertNativeToDart_AcceptStructuredClone(this.get$_lib_value());
},
 get$_lib_value: function() {
return this.value;
}
});

$.$defineNativeClass('IDBDatabase', [], {
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBDatabaseException', ["message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBObjectStore', [], {
 add$2: function(value, key) {
  if (!$.eqB($.CTC4, key))
    return this._add_1$2($._convertDartToNative_SerializedScriptValue(value), key);
  return this._add_2$1($._convertDartToNative_SerializedScriptValue(value));
},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC4)
},
 _add_1$2: function(value, key) {
  return this.add(value,key);
},
 _add_2$1: function(value) {
  return this.add(value);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBRequest', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._IDBRequestEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('IDBTransaction', [], {
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLIFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["data?"], {
 is$_ImageDataImpl: function() { return true; },
 is$ImageData: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["value="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLKeygenElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'String');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaSource', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStream', [], {
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', [], {
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
},
 add$1: function(track) {
  return this.add(track);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 remove$1: function(track) {
  return this.remove(track);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["data?"], {
});

$.$defineNativeClass('MessagePort', [], {
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMetaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }

  return this;
},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 get$text: function() {
return this.textContent;
},
 set$text: function(value) {
this.textContent = value;
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 clone$1: function(deep) {
  return this.cloneNode(deep);
},
 contains$1: function(other) {
  return this.contains(other);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
}
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._parent.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 get$first: function() {
  return this.operator$index$1(0);
},
 first$0: function() { return this.get$first().call$0(); },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 get$on: function() {
  return $._NotificationEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["data?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOutputElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ProcessingInstruction', ["data?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RTCPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('RangeException', ["message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$elements: function() {
  return $.FilteredElementList$(this);
},
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
},
 get$innerHTML: function() {
  var container = $._ElementFactoryProvider_Element$tag('div');
  var cloned = this.clone$1(true);
  $.addAll(container.get$elements(), cloned.get$elements());
  return container.get$innerHTML();
},
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["message?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGFEBlendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPatternElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGUseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["length=", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLSourceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 get$length: function() {
  return this.get$$$dom_length();
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$$$dom_length: function() {
return this.length;
},
 $dom_clear$0: function() {
  return this.clear();
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
},
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'StyleSheet');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextEvent', ["data?"], {
});

$.$defineNativeClass('TextTrack', [], {
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCue', ["text="], {
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Touch');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["keyCode?"], {
});

$.$defineNativeClass('HTMLUListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitNamedFlow', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WebSocket', [], {
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 send$1: function(data) {
  return this.send(data);
}
});

$.$defineNativeClass('DOMWindow', ["length?", "navigator?"], {
 get$on: function() {
  return $._WindowEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$(this);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._WorkerContextEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XPathException', ["message?"], {
 toString$0: function() {
  return this.toString();
}
});

// 303 dynamic classes.
// 325 classes
// 31 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray';
  var v2/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v3/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v4/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v5/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v6/*class(_SVGElementImpl)*/ = [v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v12/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v13/*class(_NodeImpl)*/ = [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v14/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v15/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest';
  var v16/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGGradientElement', v3/*class(_SVGGradientElementImpl)*/],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v2/*class(_SVGTextContentElementImpl)*/],
    ['AbstractWorker', v16/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', v1/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v1/*class(_Uint8ArrayImpl)*/,v1/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['UIEvent', 'UIEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|WheelEvent|WheelEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|WheelEvent|WheelEvent|KeyboardEvent|CompositionEvent'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['WorkerContext', v12/*class(_WorkerContextImpl)*/],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v4/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v5/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Node', v13/*class(_NodeImpl)*/],
    ['MediaStream', v14/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v15/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,'EventTarget|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.main();
    }
  }, false);
} else {
  $.main();
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter =   function(field, prototype) {
    var len = field.length;
    var lastChar = field[len - 1];
    var needsGetter = lastChar == '?' || lastChar == '=';
    var needsSetter = lastChar == '!' || lastChar == '=';
    if (needsGetter || needsSetter) field = field.substring(0, len - 1);
    if (needsGetter) {
      var getterString = "return this." + field + ";";
        prototype["get$" + field] = new Function(getterString);
    }
    if (needsSetter) {
      var setterString = "this." + field + " = v;";
      prototype["set$" + field] = new Function("v", setterString);
    }
    return field;
  };
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
