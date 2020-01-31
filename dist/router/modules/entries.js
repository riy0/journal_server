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
  var id = req.params.id;
  var result = entry.findEntry(id);
  res.status(200).json({
    status: 'success',
    data: result
  });
});

// get all
router.get('/', function(req, res) {
  var result = entry.getAllEntry();
  res.status(200).json({
    status: 'success',
    data: result
  });
});

// add an entry
router.post('/', function (req, res) {
  var result = entry.addEntry(req.body.title, req.body.content); 
  res.status(200).json({
    status: 'success',
    data: result
  });
});

// update
router.put('/:id', function (req, res) {
  var id = req.params.id;
  var body = req.body;

  var result = entry.updateEntry(id, body);
  res.status(200).jsson({
    status: 'success',
    data: result
  });
});

module.exports = router;
