let server = require("../server");
let expect = require("chai").expect;
const request = require('supertest');
let token = ""; 

describe('Todo APIs', () => {
    before((done) => {
        request(server)
            .post('/user/login')
            .send({ email: 'test@email.com', password: '1234' })
            .then((res) => {
                const body = res.body;
                token = res.body.token;
                done()
            })
            .catch((err) => done(err));
    });

    
    it('It should throw error when no token is passed to create a todo', (done) => {
        request(server)
            .post('/todo')
            .send([])
            .expect(401)
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('Invalid Auth Token, please login again');
                done();
            })
            .catch((err) => done(err));
    });

    it("It should create a todo with valid user token", (done) => {
        request(server)
            .post('/todo')
            .set('Authorization', 'Bearer ' + token)
            .send([])
            .expect(200)
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('Todo updated successfully');
                done();
            })
            .catch((err) => done(err));
    })

    it('It should throw error when no token is passed to retrieve a user todo list', (done) => {
        request(server)
            .get('/todo')
            .expect(401)
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('Invalid Auth Token, please login again');
                done();
            })
            .catch((err) => done(err));
    });

    it("It should throw invalid credential error when login a user with invalid credentials", (done) => {
        request(server)
            .get('/todo')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then((res) => {
                const body = res.body;
                expect(body.length).to.equal(0);
                done();
            })
            .catch((err) => done(err));
    })
})