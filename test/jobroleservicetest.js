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

        var result = await jobrolesservice.getJobRoles();

        expect(result.length).to.equal(2);
        expect(list[0]).to.equal(jobrole1);
        expect(list[1]).to.equal(jobrole2);
    });
});