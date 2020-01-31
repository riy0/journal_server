"use strict";

var _createClass = function() {
  function defineProperties(target,props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  } 
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps); 
    if (staticProps) defineProperties(Constructor, staticProps); return Constructor; 
  }; 
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

var Entry = function () {
  function Entry(id, title, content, createdAt, updatedAt) {
    _classCallCheck(this, Entry);

    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = createdAt;
    this.updated_at = updatedAt;
  }

  _createClass(Entry, [{
    key: "getEntry",
    value: function getEntry() {
      return {
        id: this.id,
        title: this.title,
        content: this.content,
        created_at: this.created_at,
        updated_at: this.updated_at
      };
    }
  }, {
    key: "id",
    get: function get() {
      return this.id;
    }
  }, {
    key: "title",
    get: function get() {
      return this.title;
    }
  }, {
    key: "content",
    get: function get() {
      return this.content;
    }
  }, {
    key: "createdAt",
    get: function get() {
      return this.created_at;
    }
  }, {
    key: "updatedAt",
    get: function get() {
      return this.updated_at;
    }
  }]);

  return Entry;
}();

module.exports = Entry; 

