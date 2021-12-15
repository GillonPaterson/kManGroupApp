const employeeservice = require("../app/jobrolesservice")
const chai = require('chai')
const expect = chai.expect;
const sinon = require("sinon");
const axios = require('axios').default;
const MockAdapter = require("axios-mock-adapter");

const mochaaxios = require('mocha-axios');
const { assert } = require("chai");

describe("Job Role Service", function() {
    afterEach(() => {
        sinon.restore();
    });

    it("Should return a list of all job roles", async() => {
        var mock = new MockAdapter(axios);
        var jobrole1 = { val: 1 };
        var jobrole2 = { val: 2 };
        var list = [jobrole1, jobrole2];


        mock.onGet('http://localhost:8080/api/getJobRoles').reply(200, list);

        var result = await employeeservice.getJobRoles();

        expect(result.length).to.equal(2);
        expect(result[0].val).to.equal(jobrole1.val);
        expect(result[1].val).to.equal(jobrole2.val);
    });

    it("Should fail to return a list of all job roles", async() => {
        var mock = new MockAdapter(axios);
        var jobrole1 = { val: 1 };
        var jobrole2 = { val: 2 };
        var list = [jobrole1, jobrole2];


        mock.onGet('http://localhost:8080/api/getJobRoles').reply(404, list);

        var result = await employeeservice.getJobRoles();

        expect(result).to.equal(undefined);
    });

    it("Should return a info about a jobRole", async() => {
        var mock = new MockAdapter(axios);
        var jobrole = { jobRoleID: 1 , jobRole: "Software Engineer"};


        mock.onGet('http://localhost:8080/api/getJobSpec/1').reply(200, jobrole);

        var result = await employeeservice.getJobRoleSpec(1)

        expect(result).to.eql(jobrole);
    });
});