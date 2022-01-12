const loginService = require("../app/services/loginService")
const chai = require('chai')
const expect = chai.expect;
const sinon = require("sinon");
const axios = require('axios').default;
const MockAdapter = require("axios-mock-adapter");
const { assert } = require("chai");

describe("login Service", ()=>{
    describe("login", ()=>{
        describe("login with invalid credentials", ()=>{
            it("should handle null token from api by returning false", async()=>{
                var loginInfo = {username: "", password: ""}
                var mock = new MockAdapter(axios);
                mock.onPost('http://localhost:8080/api/login', loginInfo).reply(400);

                var response = await loginService.login(loginInfo)
                expect(response).to.be.false
            })
        })
        describe("returned expired token", ()=>{
            it("should handle error from jwt by returning false", async()=>{
                var loginInfo = {username: "test", password: "password"}
                var mock = new MockAdapter(axios);

                var expiredToken = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE5OTY0ODksInVzZXJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJleHAiOjB9.zZ78JL5Etm1jufHzaVqqruawTHpS2zTHHu7ZShc0GHg"
                
                mock.onPost('http://localhost:8080/api/login', loginInfo).reply(200,"", {
                    authorization: "Bearer " + expiredToken});

                var response = await loginService.login(loginInfo)
                expect(response).to.be.false
            })
        })

        describe("returned token with invalid signature", ()=>{
            it("should handle error from jwt by returning false", async()=>{
                var loginInfo = {username: "test", password: "password"}
                var mock = new MockAdapter(axios);

                var invalidToken = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE5OTY0ODksInVzZXJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJleHAiOjk5OTk5OTk5OTl9.TvPZkUASnHdGwCADqNUNesrldIBN1ZxzKqO_hDXsV-E"

                mock.onPost('http://localhost:8080/api/login', loginInfo).reply(200,"", {
                    authorization: "Bearer " + invalidToken});

                var response = await loginService.login(loginInfo)
                expect(response).to.be.false
            })
        })

        describe("returned valid token", ()=>{
            it("should handle error from jwt by returning false", async()=>{
                var loginInfo = {username: "test", password: "password"}
                var mock = new MockAdapter(axios);

                var validToken = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE5OTY0ODksInVzZXJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJleHAiOjk5NDIwMDAwODl9.s138u1Tl-3IE6NcZGBDaCyUtp-D4_kG33QTW27gq2fI"

                mock.onPost('http://localhost:8080/api/login', loginInfo).reply(200,"", {
                    authorization: "Bearer " + validToken});

                var response = await loginService.login(loginInfo)
                expect(response).to.equal(validToken)
            })
        })
    })
})