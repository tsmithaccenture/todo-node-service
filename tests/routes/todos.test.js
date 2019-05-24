// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
// Configure chai
chai.use(chaiHttp);
chai.should();

const { hello } = require('../../routes/todos');

let req = {
    body: {},
}

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('Todos', function() {
    describe("POST /", () => {
        it("should return OK when request is made", (done) => {
            chai.request(app)
                .post("/todos")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.contain({body:'Hello'})
                    done();
                 });
                

        });
    });
});