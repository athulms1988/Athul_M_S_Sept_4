let server = require("../server");
let expect = require("chai").expect;
const request = require('supertest');
 

describe('Health API', () => {
    
    describe('Test GET  /health', () => {
        it('It should give OK message', (done) => {
            request(server)
                .get('/health')
                .then((res) => {
                    const body = res.body;
                    expect(body.message).to.equal('ok');
                    expect(body.status).to.equal(200);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});