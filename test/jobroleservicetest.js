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

    it("Should return jobSpec info", async() => {
        var mock = new MockAdapter(axios);
        var jobrole = { jobRoleID: 1 , jobRole: "Software Engineer"};


        mock.onGet('http://localhost:8080/api/getJobSpec/1').reply(200, jobrole);

        var result = await employeeservice.getJobRoleSpec(1)

        expect(result).to.eql(jobrole);
    });

    it("Should return false when 400 error", async() => {
        var mock = new MockAdapter(axios);

        mock.onGet('http://localhost:8080/api/getJobSpec/100').reply(400, "");

        var result = await employeeservice.getJobRoleSpec(100)

        expect(result).to.equal(false);
    })

    it("should return list of with competency data", async() => {
        var mock = new MockAdapter(axios);
        var jobrole = {bandLevel: 'Associate',competencyStage1: "Reflects on owninteractions with a wide and diverse range of individuals andgroups from within and beyond immediate service/organisation.Challenges and refreshes own values, beliefs, leadership styles and approaches. Overtly role models the giving and receiving of feedback.",competencyStage2: 'Successfully manages a range of personal and organisational demandsand pressures. Demonstrates tenacity and resilience. Overcomes setbackswhere goals cannot be achieved and quickly refocuses. Is visible andaccessible to others.', competencyStage3: 'Develops through systematically scanningthe external environment and exploring leading edge thinking and best practice.Applies learning to build and refresh the business. Treats challenge as a positive forcefor improvement.', competencyStage4: null, competencyStage: null, competencyName: null, competencyData: null};

        mock.onGet('http://localhost:8080/api/getJobCompetency/1').reply(200, jobrole);

        var result = await employeeservice.getCompetencyData(1)
        expect(result).to.eql(jobrole);
    });
});