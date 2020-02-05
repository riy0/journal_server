'use strict';

var _express = require('express');
var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');
var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _morgan = require('morgan');
var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');
var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./router/index');
var _index2 = _interopRequireDefault(_index);

var _swaggerUiExpress =  require('swagger-ui-express');
var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swagger = require('../swagger.json');
var _swagger2 = _interopRequireDefault(_swagger);


function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;
app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With, X-Access-Token, X-Key, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  var keys = Object.keys(req.body);
  keys.forEach(function (val) {
    req.body[val] = req.body[val].trim();
  });
  next();
});

app.use('/api/v1/entries', _index2.default.entries);
app.use('/api/v1/auth', _index2.default.users);
app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));

app.use(function(req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use(function (error, req, res, next) {
  if (error instanceof _expressValidation2.default.ValidationError) {
    var messages = error.errors.reduce(function (msg, obj) {
      msg.push(obj.messages[0]);
      return msg;
    }, []);

    res.status(error.status).json({
      status: 'error',
      message: error.statusText,
      errors: messages
    });
  } else {
    res.status(error.status || 500);
    res.json({
      status: 'error',
      message: error.message || 'An error occured'
    });
  }
  next();
});

if (!module.parent) {
  app.listen(port, function() {
    //console.log('Listening on port ' + port);
  });
}

module.exports = app;
