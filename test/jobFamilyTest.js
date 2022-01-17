const jobFamilyService = require('../app/services/jobFamilyService')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter')

describe('Job Role Service', function () {
    afterEach(() => {
      sinon.restore()
    })

    it('Should create a table array for Job Families from api', async () => {
        var mock = new MockAdapter(axios)
        var returnedResponse = [{ jobCapability: 'Engineering', jobFamily: ['Engineering Strategy and Planning', 'Engineering'] }, { jobCapability: 'Cyber Security', jobFamily: [] }, { jobCapability: 'AI', jobFamily: ['Data Science'] }]
    
        mock.onGet('http://localhost:8080/api/getJobFamilies/').reply(200, returnedResponse)
    
        var returnedArray = await jobFamilyService.getJobFamilies()
    
        var expectedArray = [['Engineering', 'Engineering Strategy and Planning', 'Engineering'], ['Cyber Security'], ['AI', 'Data Science']]
        expect(returnedArray).to.eql(expectedArray)
      })
    
      it('Get Families Should return false when 400', async () => {
        var mock = new MockAdapter(axios)
    
        var testObject = { capabilities: ['Test'], jobFamilyModels: [{ jobFamily: 'Test', jobCapability: 'Test' }] }
    
        mock.onGet('http://localhost:8080/api/getJobFamilies/').reply(400, testObject)
    
        var result = await jobFamilyService.getJobFamilies()
    
        expect(result).to.be.false
      })
})