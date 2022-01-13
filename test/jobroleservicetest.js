const employeeservice = require('../app/services/jobrolesservice')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter')

const mochaaxios = require('mocha-axios')
const { assert } = require('chai')
const { default: mock } = require('webdriverio/build/commands/browser/mock')

describe('Job Role Service', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('Should return a list of all job roles', async () => {
    var mock = new MockAdapter(axios)
    var jobrole1 = { val: 1 }
    var jobrole2 = { val: 2 }
    var list = [jobrole1, jobrole2]

    mock.onGet('http://localhost:8080/api/getJobRoles').reply(200, list)

    var result = await employeeservice.getJobRoles()

    expect(result.length).to.equal(2)
    expect(result[0].val).to.equal(jobrole1.val)
    expect(result[1].val).to.equal(jobrole2.val)
  })

  it('Should fail to return a list of all job roles', async () => {
    var mock = new MockAdapter(axios)
    var jobrole1 = { val: 1 }
    var jobrole2 = { val: 2 }
    var list = [jobrole1, jobrole2]

    mock.onGet('http://localhost:8080/api/getJobRoles').reply(404, list)

    var result = await employeeservice.getJobRoles()

    expect(result).to.equal(undefined)
  })

  it('Should return jobSpec info', async () => {
    var mock = new MockAdapter(axios)
    var jobrole = { jobRoleID: 1, jobRole: 'Software Engineer' }

    mock.onGet('http://localhost:8080/api/getJobSpec/1').reply(200, jobrole)

    var result = await employeeservice.getJobRoleSpec(1)

    expect(result).to.eql(jobrole)
  })

  it('Should return false when 400 error', async () => {
    var mock = new MockAdapter(axios)

    mock.onGet('http://localhost:8080/api/getJobSpec/100').reply(400, '')

    var result = await employeeservice.getJobRoleSpec(100)

    expect(result).to.equal(false)
  })

  it('Should return an object of all job training in groups', async () => {
    var mock = new MockAdapter(axios)
    var jt1 = { DPGroup: [], PSGroup: [], TSGroup: [] }
    var jt2 = { DPGroup: [], PSGroup: [], TSGroup: [] }
    var list = [jt1, jt2]

    mock.onGet('http://localhost:8080/api/getJobTraining/Associate').reply(200, list)

    var result = await employeeservice.getJobTraining('Associate')

    // expect(result.length).to.equal(2);

    expect(result.TSGroup).to.eql(jt1.TSGroup)
    expect(result.DPGroup).to.eql(jt2.DPGroup)
  })

  it('Should fail to return a list of all job training in groups', async () => {
    var mock = new MockAdapter(axios)
    var jt1 = { val: 1 }
    var jt2 = { val: 2 }
    var list = [jt1, jt2]

    mock.onGet('http://localhost:8080/api/getJobTraining/Associate').reply(404, list)

    var result = await employeeservice.getJobTraining('Associate')

    expect(result).to.equal(undefined)
  })

  it('Should return role matrix array from api', async () => {
    var mock = new MockAdapter(axios)

    var testMatrixOne = { jobRole: 'Dev', capability: 'Engineering', bandLevel: 'Apprentice', jobRoleID: 1 }
    var testMatrixTwo = { jobRole: 'Sec Engineer', capability: 'Cyber Security', bandLevel: 'Consultant', jobRoleID: 2 }
    var testMatrixThree = { jobRole: 'Frontend Dev', capability: 'Engineering', bandLevel: 'Apprentice', jobRoleID: 3 }
    var roleMatrixList = [testMatrixOne, testMatrixTwo, testMatrixThree]

    var bandLevel = ['Apprentice', 'Associate', 'Consultant']

    var capabilities = ['Engineering', 'AI', 'Cyber Security']

    var returnedResponse = { roleMatrixModel: roleMatrixList, bandLevel: bandLevel, capability: capabilities }

    mock.onGet('http://localhost:8080/api/getRoleMatrix').reply(200, returnedResponse)

    var returnedObject = await employeeservice.getRoleMatrix()
    var expected = { headers: ['Band Level', 'Engineering', 'AI', 'Cyber Security'], rows: [['Apprentice', '<a href="http://localhost:3000/jobSpec?jobRoleID=1">Dev</a>, <a href="http://localhost:3000/jobSpec?jobRoleID=3">Frontend Dev</a>', '', ''], ['Associate', '', '', ''], ['Consultant', '', '', '<a href="http://localhost:3000/jobSpec?jobRoleID=2">Sec Engineer</a>']] }

    expect(returnedObject).to.eql(expected)
  })

  it('Role matrix Should return false when 400', async () => {
    var mock = new MockAdapter(axios)

    var testArray = [['Test', 'Test 2'], ['Test 3']]

    mock.onGet('http://localhost:8080/api/getRoleMatrix').reply(400, testArray)

    var result = await employeeservice.getRoleMatrix()

    expect(result).to.be.false
  })

  it('Should create a table array for Job Families from api', async () => {
    var mock = new MockAdapter(axios)
    var returnedResponse = [{ jobCapability: 'Engineering', jobFamily: ['Engineering Strategy and Planning', 'Engineering'] }, { jobCapability: 'Cyber Security', jobFamily: [] }, { jobCapability: 'AI', jobFamily: ['Data Science'] }]

    mock.onGet('http://localhost:8080/api/getJobFamilies/').reply(200, returnedResponse)

    var returnedArray = await employeeservice.getJobFamilies()

    var expectedArray = [['Engineering', 'Engineering Strategy and Planning', 'Engineering'], ['Cyber Security'], ['AI', 'Data Science']]
    expect(returnedArray).to.eql(expectedArray)
  })

  it('Get Families Should return false when 400', async () => {
    var mock = new MockAdapter(axios)

    var testObject = { capabilities: ['Test'], jobFamilyModels: [{ jobFamily: 'Test', jobCapability: 'Test' }] }

    mock.onGet('http://localhost:8080/api/getJobFamilies/').reply(400, testObject)

    var result = await employeeservice.getJobFamilies()

    expect(result).to.be.false
  })

  it('Should add a job role if credentials are correct and return ID', async () => {
    var mock = new MockAdapter(axios)
    var id = 10
    var newJobRole = { jobRole: 'test' }

    mock.onPost('http://localhost:8080/api/addJobRole', newJobRole).reply(200, id)

    var result = await employeeservice.addJobRole(newJobRole)

    expect(result).to.equal(id)
  })

  it('Fails to add a job role and return -1', async () => {
    var mock = new MockAdapter(axios)
    var id = 1
    mock.onPost('http://localhost:8080/api/addJobRole').reply(400, id)

    var newJobRole = { jobRole: 'test' }
    var result = await employeeservice.addJobRole(newJobRole)

    expect(result).to.equal(-1)
  })

  it('Should edit a job role if credentials are correct and return 1', async () => {
    var mock = new MockAdapter(axios)

    var jobRoleID = 100
    var JobRole = { jobRole: 'test' }

    mock.onPost('http://localhost:8080/api/editJobRole/' + jobRoleID, JobRole).reply(200, 1)

    var result = await employeeservice.editJobRole(jobRoleID, JobRole)

    expect(result).to.equal(1)
  })

  it('Fails to edit a job role and return -1', async () => {
    var mock = new MockAdapter(axios)

    var id = 100
    mock.onPost('http://localhost:8080/api/editJobRole/' + id).reply(400, -1)

    var JobRole = { jobRole: 'test' }
    var result = await employeeservice.editJobRole(id, JobRole)

    expect(result).to.equal(-1)
  })

  it('Should delete a job role and return 1', async () => {
    var mock = new MockAdapter(axios)

    var jobRoleID = 100

    mock.onPost('http://localhost:8080/api/deleteJobRole/' + jobRoleID).reply(200, 1)

    var result = await employeeservice.deleteJobRole(jobRoleID)

    expect(result).to.equal(1)
  })

  it('Fails to delete a job role and return -1', async () => {
    var mock = new MockAdapter(axios)

    var id = 100
    mock.onPost('http://localhost:8080/api/deleteJobRole/' + id).reply(400, -1)

    var result = await employeeservice.deleteJobRole(id)

    expect(result).to.equal(-1)
  })
})
