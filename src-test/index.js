/* eslint no-unused-vars: 0 */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../dist/server';

const should = chai.should();

chai.use(chaiHttp);

describe('/POST entries', () => {
  it('should create a new entry', (done) => {
    const newEntry = {
      title: 'Test set up',
      content: `test test test test test test test
        hoge hoge hoge hoge`,
    };

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

describe('/GET/:id entries', () => {
  it('should get an entry by id', (done) => {
    const newEntry = {
      title: 'Test set up',
      content: `test test test test test test test
        hoge hoge hoge hoge`,
    };

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

  describe('/GET entries', () => {
    it('should get all entries', (done) => {
      chai
        .request(server)
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
});
