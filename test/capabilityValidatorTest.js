const chai = require('chai')
const expect = chai.expect;
const sinon = require("sinon");
const axios = require('axios').default;
const MockAdapter = require("axios-mock-adapter");
const jobrolesservice = require("../app/jobrolesservice")
const capabilityValidator = require("../app/validator/capabilityValidator")

const mochaaxios = require('mocha-axios');
const { assert } = require("chai");
const { default: mock } = require("webdriverio/build/commands/browser/mock");

describe("Capability Validator", function() {
    afterEach(() => {
        sinon.restore();
    });

    it("Should validate the capabilty name and return error because length is too long or is empty string", async() => {
        var newCapability = {capabilityName: "sdvjsbvjdsbvjksbvskdbvksvbskvsdkskvsdjvbjkvbsdkjvbsdkv"};

        expect(await capabilityValidator.checkCapability(newCapability)).to.equal("Capability Name can be A maximum of 20 characters and must be populated")
        newCapability.capabilityName = ""
        expect(await capabilityValidator.checkCapability(newCapability)).to.equal("Capability Name can be A maximum of 20 characters and must be populated")

    });

    it("Should validate the capabilty name and return error because name contains numbers ", async() => {
        var newCapability = {capabilityName: "4127896328746"};
        expect(await capabilityValidator.checkCapability(newCapability)).to.equal("Capability Name must not contain numbers")
    });

    it("Should validate the capabilty name and return error because there is a space before or after", async() => {
        var newCapability = {capabilityName: " test"};
        expect(await capabilityValidator.checkCapability(newCapability)).to.equal("Capability Name must not begin with a space")
        var newCapability = {capabilityName: "test  "};
        expect(await capabilityValidator.checkCapability(newCapability)).to.equal("Capability Name must not end with a space")


    });


});