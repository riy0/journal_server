'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    };
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}(); 

var _entryHandler = require('../handler/entryHandler');
var _entryHandler2 = _interopRequireDefault(_entryHandler);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

var EntryController = function () {
  function EntryController() {
    _classCallCheck(this, EntryController);

    this.entry= new _entryHandler2.default();
  }

  _createClass(EntryController, [{
    key: 'create',
    value: function create(req, res) {
      var result = this.entry.addEntry(req.body.title, req.body.content);
      res.status(200).json({
        status: 'success',
        data: result
      })
    }
  },{
    key: 'getById',
    value: function getById(req, res) {
      // using obj destructring
      var id = req.params.id;

      var result = this.entry.findEntry(id);
      res.status(200).json({
        status: 'success',
        data: result
      });
    }
  },{
    key: 'getAll',
    value: function getAll() {
      var result = this.entry.getAll();
      res.status(200).json({
        status: 'success',
        data: result
      });
    }
  },{
    key: 'update',
    value: function update(req, res) {
      var id = req.params.id;
      var body = req.body;

      var result = this.entry.updateEntry(id, body);

      if (result !== null) {
        res.status(200).json({
          status: 'success',
          data: result
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Entry not found',
          errors: ["entry with id doesn't exist"]
        });
      }
    }
  }]);

  return EntryController;
}();

module.exports = EntryController; 
