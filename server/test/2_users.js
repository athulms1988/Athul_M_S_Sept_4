let server = require("../server");
let expect = require("chai").expect;
var sinon = require('sinon');
const userModel = require('../model/user');
const mongoose = require('mongoose');
const request = require('supertest');
 

describe('Users APIs', () => {
    before((done) => {
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);
        mongoose.connect('mongodb://localhost/mydatabase');
        sinon.stub(userModel, 'find');
        done();
    })
    
    describe('Test POST  /user/register', () => {
        it('It should throw error when no data is passed to create a user', (done) => {
            request(server)
                .post('/user/register')
                .then((res) => {
                    const body = res.body;
                    expect(body.errors.length).to.equal(3);
                    done();
                })
                .catch((err) => done(err));
        });

        it("It should create a user", (done) => {
            request(server)
                .post('/user/register')
                .send({ name: 'TEST', email: 'test@email.com', password: '1234' })
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('Account created successfully, Please login');
                    done()
                })
                .catch((err) => done(err));
        }).timeout(10000);
    });

    describe('Test POST  /user/login', () => {
        it('It should throw error when no data is passed to login a user', (done) => {
            request(server)
                .post('/user/login')
                .then((res) => {
                    const body = res.body;
                    expect(body.errors.length).to.equal(2);
                    done();
                })
                .catch((err) => done(err));
        });

        it("It should throw invalid credential error when login a user with invalid credentials", (done) => {
            request(server)
                .post('/user/login')
                .send({ email: 'test@email.com', password: '1234' })
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('Email or Password is invalid');
                    done()
                })
                .catch((err) => done(err));
        })

        it("It should login a user with valid credentials", (done) => {
            userModel.find.restore();
            request(server)
                .post('/user/login')
                .send({ email: 'test@email.com', password: '1234' })
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('Login Successful');
                    done()
                })
                .catch((err) => done(err));
        })
    });
});