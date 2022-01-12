const { expect, assert } = require("chai");
const sinon = require("sinon");

const next = sinon.spy();
const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.redirect = sinon.stub().returns(res);
    res.locals = {};
    res.locals.auth = {};
    return res;
};

const mockRequest = (path, token) => {
    return {
        path: path,
        cookies: {access_token: token}
    }
};

const authorisation = require("../lib/middleware/authentication/authoriser.js");

describe("Authoriser", ()=>{
    describe("Is run on a non secure path", () => {
        it('should progress to the next middleware', () => {
            const req = mockRequest("/login")
            const res = mockResponse()
            authorisation(req, res, next)
            assert(next.called)
        })
    })
    describe("Is run on a secure path", () => {
        const path = "/test"
        describe("Token is null", () =>{
            it('should return 403 status and it should redirect to login', () => {
                const req = mockRequest(path)
                const res = mockResponse()
                authorisation(req, res, next)
                assert(res.status.calledWith(403))
                assert(res.redirect.calledWith("login"))
            })
        })
        describe("Token is valid", () =>{
            it('should change res.locals.auth to username and password and should call next()', () => {
                const req = mockRequest(path, "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE5OTY0ODksInVzZXJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJleHAiOjk5NDIwMDAwODl9.s138u1Tl-3IE6NcZGBDaCyUtp-D4_kG33QTW27gq2fI")
                const res = mockResponse()
                authorisation(req, res, next)
                expect(res.locals.auth).to.eql({username: "admin", isAdmin: true})
                assert(next.called)
            })
        })
        describe("Token has invalid signature", () =>{
            it('should return 401 status and it should redirect to login', () => {
                const req = mockRequest(path, "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE5OTY0ODksInVzZXJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJleHAiOjk5OTk5OTk5OTl9.TvPZkUASnHdGwCADqNUNesrldIBN1ZxzKqO_hDXsV-E")
                const res = mockResponse()
                authorisation(req, res, next)
                assert(res.status.calledWith(401))
                assert(res.redirect.calledWith("login"))
            })
        })
        describe("Token is expired", () =>{
            it('should return 401 status and it should redirect to login', () => {
                const req = mockRequest(path, "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE5OTY0ODksInVzZXJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJleHAiOjB9.zZ78JL5Etm1jufHzaVqqruawTHpS2zTHHu7ZShc0GHg")
                const res = mockResponse()
                authorisation(req, res, next)
                assert(res.status.calledWith(401))
                assert(res.redirect.calledWith("login"))
            })
        })
    })
})