"use strict";

var _createClass = function () {
  function defineProperties(target, props) {
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
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps) 
      defineProperties(Constructor, staticProps); return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

var Entry = function () {
  function Entry(title, content, createdAt, updatedAt) {
    _classCallCheck(this, Entry);

    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  _createClass(Entry, [{
    key: "getEntry",
    value: function getEntry() {
      return {
        title: this.title,
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      };
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
      return this.createdAt;
    }
  }, {
    key: "updatedAt",
    get: function get() {
      return this.updatedAt;
    }
  }]);

  return Entry;
}();

module.exports = Entry; 
