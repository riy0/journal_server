import chai from 'chia';
import chaiHttp from 'chai-http';
import server from '../dist/server';

/* eslint-env mocha */
/* eslint no-unused-vars: 0 */
const should = chai.should();

chai.use(chaiHttp);

const newEntry = {
  title: 'Test set up',
  content: `test test test test test test test
    hoge hoge hoge hoge`
};

describe('/POST entries', () => {
  it('should create a new entry', (done) => {
    chai.request(server)
    .post('/api/v1/entries')
    .send(newEntry)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.data.should.be.a('object');
      done();
    });
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
});
