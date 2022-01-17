const competencyService = require('../app/services/competencyService')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter')

describe('Competency Service Test', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('should return list of with competency data', async () => {
    var mock = new MockAdapter(axios)
    var jobrole = { bandLevel: 'Associate', competencyStage1: 'Reflects on owninteractions with a wide and diverse range of individuals andgroups from within and beyond immediate service/organisation.Challenges and refreshes own values, beliefs, leadership styles and approaches. Overtly role models the giving and receiving of feedback.', competencyStage2: 'Successfully manages a range of personal and organisational demandsand pressures. Demonstrates tenacity and resilience. Overcomes setbackswhere goals cannot be achieved and quickly refocuses. Is visible andaccessible to others.', competencyStage3: 'Develops through systematically scanningthe external environment and exploring leading edge thinking and best practice.Applies learning to build and refresh the business. Treats challenge as a positive forcefor improvement.', competencyStage4: null, competencyStage: null, competencyName: null, competencyData: null }

    mock.onGet('http://localhost:8080/api/getJobCompetency/1').reply(200, jobrole)

    var result = await competencyService.getCompetencyData(1)
    expect(result).to.eql(jobrole)
  })
})
