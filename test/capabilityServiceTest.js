const chai = require('chai')
const expect = chai.expect;
const sinon = require("sinon");
const axios = require('axios').default;
const MockAdapter = require("axios-mock-adapter");
const capabilityService = require("../app/jobrolesservice")

const mochaaxios = require('mocha-axios');
const { assert } = require("chai");
const { default: mock } = require("webdriverio/build/commands/browser/mock");

describe("Capability Service", function() {
    afterEach(() => {
        sinon.restore();
    });

    it("Should add a capability if credentials are correct and return ID", async() => {

        var mock = new MockAdapter(axios);
        
        var capability = 1;
                
        var cap = {capability: "test"}

        mock.onPost('http://localhost:8080/api/createCapability').reply(200, capability);
        
        var result = await capabilityService.addCapabilty(cap);
         
        expect(result).to.equal(capability);
        
        });

    it("Should return a list of all capability leads", async() => {
        var mock = new MockAdapter(axios);
        var cap1 = { val: 1 };
        var cap2 = { val: 2 };
        var capLeads = [cap1, cap2];


        mock.onGet('http://localhost:8080/api/getAllCapabilityLead').reply(200, capLeads);

        var result = await capabilityService.getAllCapabilityLeadsInfo();

        expect(result.length).to.equal(2);
        expect(result[0].val).to.equal(cap1.val);
        expect(result[1].val).to.equal(cap2.val);
    });
    
    it("Should return capability lead info info", async() => {
        var mock = new MockAdapter(axios);
        var lead = { leadID: 1 };


        mock.onGet('http://localhost:8080/api/getCapabilityLead/1').reply(200, lead);

        var result = await capabilityService.getCapabilityLeadInfo(1)

        expect(result).to.eql(lead);
    });

    });