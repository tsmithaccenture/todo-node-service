// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');

var TodoItem = require('../../models/todoModel')

// Configure chai
chai.use(chaiHttp);
chai.should();

before(function (done) {
    TodoItem.remove({}, (err) => {
      console.error(err)
      done()
    })
  })

describe("GET /", () => {
    it("should return OK when request is made", (done) => {
        chai.request(app)
            .get("/todos")
            .end((err, res) => {
                res.should.have.status(200);
                done();
             });
    });

    it("should have a count of one ", (done) => {
        TodoItem.create({title: 'test1', body: 'TestBod'})
        chai.request(app)
            .get("/todos")
            .end((err, res) => {
                res.body.should.have.length(1)
                done();
             });
    });
});

describe("GET /:id", () => {

    it("should return todoItem", (done) =>{
        let item = new TodoItem({title: 'test1', body: 'TestBod'})
        item.save((err, item) => {
            chai.request(app)
            .get('/todos/' + item._id)
            .send(item)
            .end((err, res) => {
                res.body.data.should.have.property('_id').eql(item.id);
                done();
             });
        })
    })
})

describe('/POST todo', () => {
    it('it should create todo item', (done) => {
        let item = {title: "Item1", body: "Cool Body", status: false};
        chai.request(app)
            .post('/todos')
            .send(item)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        
    });
});