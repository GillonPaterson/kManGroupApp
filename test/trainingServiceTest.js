const trainingService = require('../app/services/trainingService')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter')

describe('Job Role Service', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('Should return an object of all job training in groups', async () => {
    var mock = new MockAdapter(axios)
    var jt1 = { DPGroup: [], PSGroup: [], TSGroup: [] }
    var jt2 = { DPGroup: [], PSGroup: [], TSGroup: [] }
    var list = [jt1, jt2]

    mock.onGet('http://localhost:8080/training/getJobTraining/Associate').reply(200, list)

    var result = await trainingService.getJobTraining('Associate')

    // expect(result.length).to.equal(2);

    expect(result.TSGroup).to.eql(jt1.TSGroup)
    expect(result.DPGroup).to.eql(jt2.DPGroup)
  })

  it('Should fail to return a list of all job training in groups', async () => {
    var mock = new MockAdapter(axios)
    var jt1 = { val: 1 }
    var jt2 = { val: 2 }
    var list = [jt1, jt2]

    mock.onGet('http://localhost:8080/training/getJobTraining/Associate').reply(404, list)

    var result = await trainingService.getJobTraining('Associate')

    expect(result).to.equal(undefined)
  })
})
