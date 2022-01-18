const employeeservice = require('../app/services/jobrolesservice')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter')

describe('Job Role Service', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('Should return a list of all job roles', async () => {
    var mock = new MockAdapter(axios)
    var jobrole1 = { val: 1 }
    var jobrole2 = { val: 2 }
    var list = [jobrole1, jobrole2]

    mock.onGet('http://localhost:8080/job-roles/getJobRoles').reply(200, list)

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

    mock.onGet('http://localhost:8080/job-roles/getJobRoles').reply(404, list)

    var result = await employeeservice.getJobRoles()

    expect(result).to.equal(undefined)
  })

  it('Should return jobSpec info', async () => {
    var mock = new MockAdapter(axios)
    var jobrole = { jobRoleID: 1, jobRole: 'Software Engineer' }

    mock.onGet('http://localhost:8080/job-roles/getJobSpec/1').reply(200, jobrole)

    var result = await employeeservice.getJobRoleSpec(1)

    expect(result).to.eql(jobrole)
  })

  it('Should return false when 400 error', async () => {
    var mock = new MockAdapter(axios)

    mock.onGet('http://localhost:8080/job-roles/getJobSpec/100').reply(400, '')

    var result = await employeeservice.getJobRoleSpec(100)

    expect(result).to.equal(false)
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

    mock.onGet('http://localhost:8080/job-roles/getRoleMatrix').reply(200, returnedResponse)

    var returnedObject = await employeeservice.getRoleMatrix()
    var expected = { headers: ['Band Level', 'Engineering', 'AI', 'Cyber Security'], rows: [['Apprentice', '<a href="http://localhost:3000/jobSpec?jobRoleID=1">Dev</a>, <a href="http://localhost:3000/jobSpec?jobRoleID=3">Frontend Dev</a>', '', ''], ['Associate', '', '', ''], ['Consultant', '', '', '<a href="http://localhost:3000/jobSpec?jobRoleID=2">Sec Engineer</a>']] }

    expect(returnedObject).to.eql(expected)
  })

  it('Role matrix Should return false when 400', async () => {
    var mock = new MockAdapter(axios)

    var testArray = [['Test', 'Test 2'], ['Test 3']]

    mock.onGet('http://localhost:8080/job-roles/getRoleMatrix').reply(400, testArray)

    var result = await employeeservice.getRoleMatrix()

    expect(result).to.be.false // eslint-disable-line
  })

  it('Should add a job role if credentials are correct and return ID', async () => {
    var mock = new MockAdapter(axios)
    var id = 10
    var newJobRole = { jobRole: 'test' }

    mock.onPost('http://localhost:8080/job-roles/addJobRole', newJobRole).reply(200, id)

    var result = await employeeservice.addJobRole(newJobRole)

    expect(result).to.equal(id)
  })

  it('Fails to add a job role and return -1', async () => {
    var mock = new MockAdapter(axios)
    var id = 1
    mock.onPost('http://localhost:8080/job-roles/addJobRole').reply(400, id)

    var newJobRole = { jobRole: 'test' }
    var result = await employeeservice.addJobRole(newJobRole)

    expect(result).to.equal(-1)
  })

  it('Should edit a job role if credentials are correct and return 1', async () => {
    var mock = new MockAdapter(axios)

    var jobRoleID = 100
    var JobRole = { jobRole: 'test' }

    mock.onPost('http://localhost:8080/job-roles/editJobRole/' + jobRoleID, JobRole).reply(200, 1)

    var result = await employeeservice.editJobRole(jobRoleID, JobRole)

    expect(result).to.equal(-1)
  })

  it('Fails to edit a job role and return -1', async () => {
    var mock = new MockAdapter(axios)

    var id = 100
    mock.onPut('http://localhost:8080/job-roles/editJobRole/' + id).reply(400, -1)

    var JobRole = { jobRole: 'test' }
    var result = await employeeservice.editJobRole(id, JobRole)

    expect(result).to.eql(-1)
  })

  it('Should delete a job role and return 1', async () => {
    var mock = new MockAdapter(axios)

    var jobRoleID = 100

    mock.onPost('http://localhost:8080/job-roles/deleteJobRole/' + jobRoleID).reply(200, 1)

    var result = await employeeservice.deleteJobRole(jobRoleID)

    expect(result).to.equal(-1)
  })

  it('Fails to delete a job role and return -1', async () => {
    var mock = new MockAdapter(axios)

    var id = 100
    mock.onPost('http://localhost:8080/job-roles/deleteJobRole/' + id).reply(400, -1)

    var result = await employeeservice.deleteJobRole(id)

    expect(result).to.equal(-1)
  })
})
