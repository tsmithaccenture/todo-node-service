// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('index', function() {
    describe("GET /", () => {
        it("should return OK when request is made", (done) => {
            chai.request(app)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                 });
        });
    });
});