import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../dist/server';

/* eslint-env mocha */
/* eslint no-unused-vars: 0 */
const should = chai.should();

chai.use(chaiHttp);

const newEntry = {
  title: 'Test set up',
  content: `test test test test test test test
    hoge hoge hoge hoge`,
};

const invalidEntries = [
  {
    title: 'test, only title'
  },
  {
    content: 'test, only content'
  }
];

let id = "";

describe('/POST entries', () => {
  it('should create a new entry', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .send(newEntry)
      .end((err, res) => {
        id = res.body.data.id;
        res.should.have.status(200);
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('should return an error when any required property is not passed', (done) => {
    /** generate random number between 0 and 1, 1 inclusive**/
    let i = Math.floor(Math.random() * 1);
    //select an entry to use at random (from one without content, one without title)
    let invalidEntry = invalidEntries[i];
    chai.request(server)
      .post('/api/v1/entries')
      .send(invalidEntry)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.status.should.equal('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('array');
        done();
      })
  });

});

/**
 * TEST THE, GET ALL ENPOINT
 */
describe('/GET entries', () => {
  it('should get all the entries', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.a('object');
        done();
      });
  });
});

/**
 * TEST THE, GET BY ID ENPOINT
 */
describe('/GET/:id entries', () => {
  it('should get an entry by a given id', (done) => {
    chai.request(server)
      .get(`/api/v1/entries/${id}`)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.be.a('object');
        done();
      });
  });
});

/**
 * TEST THE PUT ENPOINT
 */
describe('/PUT/:id entries', () => {
  const entryUpdate = {
    title: 'update test',
    content: `update test test test test test test test test test test `,
  };

  it('should update an entry by a given id', (done) => {
    chai.request(server)
      .put(`/api/v1/entries/${id}`)
      .send(entryUpdate)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.have.property('status');
        done();
      });
  });

  /*
  it('should return error when id is not found', (done) => {
    chai.request(server)
      .put('/api/v1/entries/ ')
      .send(entryUpdate)
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.have.property('status');
        response.body.status.should.equal('error');
        response.body.should.have.property('errors');
        response.body.errors.should.be.a('Array');
        done();
      });
  });
  */

  it('should return an error when any required property is not passed', (done) => {
    let i = Math.floor(Math.random() * 1);
    let invalidEntry = invalidEntries[i];
    chai.request(server)
      .put(`/api/v1/entries/${id}`)
      .send(invalidEntry)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.status.should.equal('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('array');
        done();
      })
  });
});

/**
 * TEST THE DELETE ENPOINT
 */
describe('/DELETE/:id entries', () => {

  it('should delete an entry by a given id', (done) => {
    chai.request(server)
      .delete(`/api/v1/entries/${id}`)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.be.a('object');
        done();
      });
  });

  it('should return error when id of entry to delete is not found', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/054c0398f7c70b2e')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.have.property('status');
        response.body.status.should.equal('error');
        response.body.should.have.property('errors');
        response.body.errors.should.be.a('Array');
        done();
      });
  });
});

/**
 * TEST AN INVALID ENPOINT 
 */
describe('Invalid endpoint request', () => {
  it('should return a 404 error with an error message', (done) => {
    chai.request(server)
      .get('/api/v1/entri')
      .end((err, res) => {
        res.body.should.have.property('status');
        res.body.status.should.equal('error');
        done();
      });
  });
});
