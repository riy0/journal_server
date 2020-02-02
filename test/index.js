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

/* TEST THE POST ENDPOINT */
describe('/POST entries', () => {
  it('should create a new entry', (done) => {
    chai.request(server)
    .post('/api/v1/entries')
    .send(newEntry)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.data.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal('success');
      res.body.should.have.property('data');
      res.body.data.should.be.a('array');
      res.body.data[0].should.be.a('object');

      done();
    });
  });

  it('should return an error when any required property is not passed', (done) => {
    /** generate random number between 0 and 1, 1 inclusive**/
    let i = Math.floor(Math.random() * 1);
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

describe('/GET entries', () => {
  it('should get all the entries', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.a('object');
        done();
      });
  });
});

describe('/GET/:id entries', () => {
  it('should get an entry by a given id', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .send(newEntry)
      .end((err, res) => {
        chai.request(server)
          .get(`/api/v1/entries/${res.body.data.id}`)
          .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.data.should.be.a('object');
            done();
          });
      });
  });
});

describe('/PUT/:id entries', () => {
  it('should update an entry by a given id', (done) => {
    const entryUpdate = {
      title: 'New Setting up testing',
      content: `test test test test test test test
        until the Andela circle 34 bootcamp challenge came in.`,
    }
    chai.request(server)
    .post('/api/v1/entries')
    .send(newEntry)
    .end((err, res) => {
      id = res.body.data.id;
      chai.request(server)
        .put(`/api/v1/entries/${res.body.data.id}`)
        .send(entryUpdate)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.data.should.be.a('object');
          done();
        });
    });
  });
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
