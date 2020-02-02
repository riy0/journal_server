'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: 0 */


var _store = require('../memory/store');
var _store2 = _interopRequireDefault(_store);

var _index = require('../model/index');
var _index2 = _interopRequireDefault(_index);

var _utils = require('../helpers/utils');
var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntryHandler = function () {
  function EntryHandler() {
    _classCallCheck(this, EntryHandler);

    this.entryStore = new _store2.default.Entry();
    this.entries = [];
    this.entry = {};
  }

  _createClass(EntryHandler, [{
    key: 'addEntry',
    value: function addEntry(title, content) {
      var id = _utils2.default.generateId();
      var newEntry = new _index2.default.Entry(id, title, content, Date.now(), Date.now());
      this.entry = this._entryStore.insert(newEntry.getEntry());
      return this.entry;
    }
  }, {
    key: 'findEntry',
    value: function findEntry(id) {
      this.entry = this.entryStore.findOne(id);
      return this.entry;
    }
 }, {
    key: 'getAllEntry',
    value: function getAllEntry() {
      this.entries = this._entryStore.findAll();
      return this.entries;
    }
 }, {
    key: 'updateEntry',
    value: function updateEntry(id, body) {
      var entry = this.entryStore.findOne(id);
      if (entry !== null) {
        var keys = Object.keys(entry);
        var entryUpdate = {};
        keys.forEach(function (key) {
          entryUpdate[key] = body[key] !== undefined ? body[key] : entry[key];
        });
        // update date
        entryUpdate.updated_at = Date.now();
        this.entry = this.entryStore.update(id, entryUpdate);

        return this.entry;
      }
      return null;
    }
  }]);

  return EntryHandler;
}();

module.exports = EntryHandler; 
