const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter')
const capabilityService = require('../app/services/capabilityService')
const capabilityValidator = require('../app/validator/capabilityValidator')

describe('Capability Validator', function () {
  afterEach(() => {
    sinon.restore()
  })
  it('Should validate the capabilty name and return error because length is too long or is empty string', async () => {
    const newCapability = { capabilityName: 'sdvjsbvjdsbvjksbvskdbvksvbskvsdkskvsdjvbjkvbsdkjvbsdkv' }

    expect(await capabilityValidator.checkCapability(newCapability)).to.equal('Capability Name can be A maximum of 20 characters and must be populated')
    newCapability.capabilityName = ''
    expect(await capabilityValidator.checkCapability(newCapability)).to.equal('Capability Name can be A maximum of 20 characters and must be populated')
  })
  it('Should validate the capabilty name and return error because name contains numbers ', async () => {
    const newCapability = { capabilityName: '4127896328746' }
    expect(await capabilityValidator.checkCapability(newCapability)).to.equal('Capability Name must not contain numbers')
  })
  it('Should validate the capabilty name and return error because there is a space before or after', async () => {
    const spaceBeforeTest = { capabilityName: ' test' }
    expect(await capabilityValidator.checkCapability(spaceBeforeTest)).to.equal('Capability Name must not begin with a space')
    const spaceAfterTest = { capabilityName: 'test  ' }
    expect(await capabilityValidator.checkCapability(spaceAfterTest)).to.equal('Capability Name must not end with a space')
  })
  it('Should add a capability if credentials are correct and return ID', async () => {
    const mock = new MockAdapter(axios)
    const id = 10
    const newCapability = { capabilityName: 'test' }
    mock.onPost('http://localhost:8080/capability/createCapability', newCapability).reply(200, id)
    const result = await capabilityService.addCapabilty(newCapability)
    expect(result).to.equal(id)
  })
})
