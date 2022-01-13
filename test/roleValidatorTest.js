const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter')
const jobrolesservice = require('../app/services/jobrolesservice')
const roleValidator = require('../app/validator/roleValidator')

const mochaaxios = require('mocha-axios')
const { assert } = require('chai')
const { default: mock } = require('webdriverio/build/commands/browser/mock')

describe('Role Validator', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('Should validate the role name and return error because length is too long', async () => {
    var newRole = { jobRole: 'sdvjsbvjdsbvjksbvskdbvksvbskvsdkskvsdjvbjkvbsdkjvbsdkvjbsdhbckbdsjclkablbblva' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must be less than 40 characters')
  })

  it('Should validate the role name and return error because length its empty', async () => {
    var newRole = { jobRole: '' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must be entered')
  })

  it('Should validate the role name and return error because name contains numbers', async () => {
    var newRole = { jobRole: '4127896328746' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must not contain a number')
  })

  it('Should validate the role name and return error because there is a space at the start or end', async () => {
    var newRole = { jobRole: ' test' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must not contain spaces at the start or end')

    newRole.jobRole = 'test  '
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must not contain spaces at the start or end')
  })

  it('Should validate the role spec and return error because its empty', async () => {
    var newRole = { jobRole: 'test', jobSpec: '' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The job specification must be entered')
  })

  it('Should validate the role link and return error because it doesnt start with https://', async () => {
    var newRole = { jobRole: 'test', jobSpec: 'test', jobLink: 'test.com' }
    expect(await roleValidator.checkrole(newRole)).to.equal("The link must start with 'https://'")
  })

  it('Should validate the role link and return error because it isnt longer than 8 charaters', async () => {
    var newRole = { jobRole: 'test', jobSpec: 'test', jobLink: 'https://' }
    expect(await roleValidator.checkrole(newRole)).to.equal('A link must be entered')
  })

  it('Should validate the role responsibilities and return error because its empty', async () => {
    var newRole = { jobRole: 'test', jobSpec: 'test', jobLink: 'https://test.com', jobResponsibilities: '' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The job responsibilities must be entered')
  })
})
