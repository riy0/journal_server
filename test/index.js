'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../dist/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

//const should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('/GET entries', function() {
  it('should Get all entries', function(done) {
    _chai2.default
      .request(_server2.default)
      .get('/api/v1/entries')
      .end(function(err, res) {
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data.length.should.be.eql(2);
        done();
      });
  });
});
