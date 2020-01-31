import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../dist/server';

// const should = chai.should();

chai.use(chaiHttp);

describe('/GET entries', () => {
  it('should Get all the entries', (done) => {
    chai
      .request(server)
      .get('/api/v1/entries')
      .end(() => {
        done();
      });
  });
});
