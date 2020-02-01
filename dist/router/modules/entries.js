'use strict';

var _express = require('express');
var _express2 = _interopRequireDefault(_express);

var _entryController = require('../../controller/entryController');
var _entryController2 = _interopRequireDefault(_entryController);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();
var entry = new _entryController2.default();

//get entry by id
router.get('/:id', function(req, res) {
  entry.getById(req, res);
});

// get all
router.get('/', function(req, res) {
  entry.getAll(req, res);
});

// add an entry
router.post('/', function (req, res) {
  entry.create(req, res);
});

// update
router.put('/:id', function (req, res) {
  entry.update(req, res);
});

module.exports = router;
