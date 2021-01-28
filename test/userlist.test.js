var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('SERVER HEALTH CHECKS', function() {
    it('should have return Server health checks', function(done) {
        request(app)
            .get('/')
            .end(function(err, res) {
                expect(body).to.equal('Server is healthy!.');
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });
});

describe('LIST OF USERS', function() {
    it('should have return user with bank list', function(done) {
        request(app)
            .get('/user/list')
            .end(function(err, res) {
                // expect(res.body.version).to.be.ok;
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });
});