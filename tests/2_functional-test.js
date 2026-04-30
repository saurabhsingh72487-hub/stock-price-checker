const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(15000);

  suite('GET /api/stock-prices => stock data', function() {
    
    test('Viewing one stock: GET /api/stock-prices/', function(done) {
      chai.request(server)
        .get('/api/stock-prices?stock=AAPL')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stock');
          assert.property(res.body, 'likes');
          assert.property(res.body, 'price');
          done();
        });
    });

    test('Viewing one stock and liking it: GET /api/stock-prices/?stock=AAPL&like=true', function(done) {
      chai.request(server)
        .get('/api/stock-prices?stock=AAPL&like=true')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stock');
          assert.property(res.body, 'likes');
          assert.property(res.body, 'price');
          assert.isNumber(res.body.likes);
          done();
        });
    });

    test('Viewing the same stock and liking it again: GET /api/stock-prices/?stock=AAPL&like=true', function(done) {
      chai.request(server)
        .get('/api/stock-prices?stock=AAPL&like=true')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stock');
          assert.property(res.body, 'likes');
          assert.property(res.body, 'price');
          assert.isNumber(res.body.likes);
          done();
        });
    });

    test('Viewing two stocks: GET /api/stock-prices/?stock=AAPL&stock=GOOG', function(done) {
      chai.request(server)
        .get('/api/stock-prices?stock=AAPL&stock=GOOG')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.lengthOf(res.body, 2);
          assert.property(res.body[0], 'stock');
          assert.property(res.body[0], 'likes');
          assert.property(res.body[0], 'price');
          assert.property(res.body[0], 'rel_likes');
          done();
        });
    });

    test('Viewing two stocks and liking both: GET /api/stock-prices/?stock=AAPL&stock=GOOG&like=true', function(done) {
      chai.request(server)
        .get('/api/stock-prices?stock=AAPL&stock=GOOG&like=true')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.lengthOf(res.body, 2);
          assert.property(res.body[0], 'stock');
          assert.property(res.body[0], 'likes');
          assert.property(res.body[0], 'price');
          assert.property(res.body[0], 'rel_likes');
          assert.property(res.body[1], 'stock');
          assert.property(res.body[1], 'likes');
          assert.property(res.body[1], 'price');
          assert.property(res.body[1], 'rel_likes');
          done();
        });
    });
  });
});