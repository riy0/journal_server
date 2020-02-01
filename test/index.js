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
var should = _chai2.default.should(); 
/* eslint-env mocha */
/* eslint no-unused-vars: 0 */

chai2.default.use(_chaiHttp2.default);

describe('/POST entries', function () {
  it('should create a new entry', function (done) {
    var newEntry = {
      title: 'Setting up testing',
      content: 'I\'ve heard about testing before but never had a reason to take it so serious\n        until the Andela circle 34 bootcamp challenge came in.'
    };

    _chai2.default.request(_server2.default).post('/api/v1/entries').send(newEntry).end(function (err, res) {
      res.should.have.status(200);
      res.body.data.should.be.a('object');
      done();
    });
  });
});

describe('/GET entries', function() {
  it('should get all entries', function(done) {
    _chai2.default .request(_server2.default)
      .get('/api/v1/entries')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.a('object');
        done();
      });
  });
});


describe('/GET/:id entries', function () {
  it('should get an entry by a given id', function (done) {
    var newEntry = {
      title: 'Setting up testing',
      content: 'I\'ve heard about testing before but never had a reason to take it so serious\n        until the Andela circle 34 bootcamp challenge came in.'
    };

    _chai2.default.request(_server2.default).post('/api/v1/entries').send(newEntry).end(function (err, res) {
      _chai2.default.request(_server2.default).get('/api/v1/entries/' + res.body.data.id).end(function (error, response) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.be.a('object');
        done();
      });
    });
  });
});
