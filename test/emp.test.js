const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let data = fs.readFileSync('test/empData.json');
let empInput = JSON.parse(data);

describe('POST/login', () => {
    it('given new empData When loggedIn should return status 200, success=true', (done) => {
        const empData = empInput.TestData1;
        chai.request(server)
            .post('/login')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(200);
               // res.body.should.be.property('success').eq(true);
                //res.body.should.be.property('message').eq("loged in successfully");
                res.body.should.be.property('token');
                done();
            });
    });

     it('given new empData When loggedIn should return status 404, success=false', (done) => {
        const empData = empInput.TestData2;
        chai.request(server)
            .post('/login')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.be.property('success').eq(false);
                done();
            });
        });
    });
    
describe("POST/add" ,() => {
    it("given new empData When added should return status 200, success=true" ,done =>{
        const empData = empInput.TestData3;
        chai.request(server)
            .post('/add')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(200);
              // res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("Employee Data Inserted successfully");
                done();
    });
});

          it('given new empData When added should return status 400, success=false', (done) => {
        const empData = empInput.TestData4;
        chai.request(server)
            .post('/add')
            .send(empData)
            .end((error, res) => {
                res.should.have.status(400);
            //    res.body.should.be.property('success').eq(false);
                res.body.should.be.property('message')
                done();
            });
        });
});
let jwToken='';
    
beforeEach(done => {
    chai
        .request(server)
        .post("/login")
        .send(empInput.TestData1)
        .end((err, res) => {
            jwToken = res.body.token;
            res.should.have.status(200);
            done();
        });
});

let invalidToken=jwToken.slice(12);
let empToken='';

describe("/GET /employees", () => { 
    
    it("given new empData When Reterieve should return status 200, success=true", done => {
        
        chai
            .request(server)
            .get("/employees")
            .set('Authorization', 'Bearar ' + jwToken)
            .end((err, response) => {
                response.should.have.status(200);
              //  response.body.should.have.property('message').eq("Retrived all the employee data successfully")
             //   response.body.should.have.property('EmployeeData')
                done();
            });
    });

    it("given new empData When reterieve should return status 400, success=false", done => {
        chai
            .request(server)
            .get("/employees")
            .set('Authorization', 'Bearar ' + "  ")
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property('success').eq(false)
               // response.body.should.have.property('message').eq("Invalid Token or Expired")
                done();
            });
    });
    it("given empty token When retrived Should return status 401 and success=false", done => {
        chai

            .request(server)
            .get("/employees")
            .set('Authorization', empToken)
            .end((err, response) => {
                response.should.have.status(401);
               // response.body.should.have.property('success').eq(false)
               // response.body.should.have.property('message').eq("Access Denied! add Token and then Proceed again ")
                done();
            });
    });

});
describe("/GET /employees/Id", () => { 
    
    it("given ObjectID and Valid token When retrived by Id Should return status 200 and success=true", done => {
        chai
            .request(server)
            .get("/employees/"+empInput.TestData5.Id)
            .set('Authorization', 'Bearar ' + jwToken)
            .end((err, response) => {
                response.should.have.status(200);
             //   response.body.should.have.property('success').eq(true);
            //  response.body.should.have.property('foundData');
                done();
         });
    });    
});
