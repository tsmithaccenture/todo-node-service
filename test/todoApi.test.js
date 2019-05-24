'use strict';

var loopback = require('loopback');
var app = module.exports = loopback();
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();
let todo = require('../server/models/todo-item');

chai.use(chaiHttp);

describe('Todo', () => {

  // beforeEach((done) => {
  //   app.dataSources.db.automigrate(function(err) {
  //     done(err);
  //   });
  // });

  describe('/POST todo', () => {
    it('it should create todo item', (done) => {
      let todo = {
        title: 'Test',
        description: 'This is a test!',
      };
      chai.request(server)
        .post('/api/todoItems')
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET todo', () => {
    it('it should GET all the todo items', () => {
      chai.request(server)
        .get('/api/todoItems')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        });
    });
  });

});
