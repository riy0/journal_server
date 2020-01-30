'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

router.get('/', function(req, res, next) {
  return res.status(200).json({
    status: 200,
    data: [
      {
        title: 'I was delighted'
      },
      {
        title: 'clean my room'
      }
    ]
  });
});

module.exports = router;
