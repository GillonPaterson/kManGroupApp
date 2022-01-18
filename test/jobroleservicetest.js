const employeeservice = require('../app/services/jobrolesservice')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const querystring = require('querystring')
const MockAdapter = require('axios-mock-adapter')

describe('Job Role Service', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('Should return a list of all job roles', async () => {
    const mock = new MockAdapter(axios)
    const jobrole1 = { val: 1 }
    const jobrole2 = { val: 2 }
    const list = [jobrole1, jobrole2]

    mock.onGet('http://localhost:8080/job-roles/getJobRoles').reply(200, list)

    const result = await employeeservice.getJobRoles()

    expect(result.length).to.equal(2)
    expect(result[0].val).to.equal(jobrole1.val)
    expect(result[1].val).to.equal(jobrole2.val)
  })

  it('Should fail to return a list of all job roles', async () => {
    const mock = new MockAdapter(axios)
    const jobrole1 = { val: 1 }
    const jobrole2 = { val: 2 }
    const list = [jobrole1, jobrole2]

    mock.onGet('http://localhost:8080/job-roles/getJobRoles').reply(404, list)

    const result = await employeeservice.getJobRoles()

    expect(result).to.equal(undefined)
  })

  it('Should return a list of all job roles with filter', async () => {
    const mock = new MockAdapter(axios)
    const filters = { capability: 'test', family: 'test', bandlevel: 'test', jobrolename: 'test' }
    const role = { jobRoleID: 1, jobRole: 'test', jobFamilyName: 'test', jobCapability: 'test', jobBandLevel: 'test' }
    const queryString = querystring.stringify(filters)

    mock.onGet('http://localhost:8080/job-roles/getJobRolesFilter?' + queryString).reply(200, role)

    const result = await employeeservice.getJobRolesFilter('', filters)

    expect(result).to.eql(role)
    mock.restore()
  })

  it('Should fail to return a list of all job roles with filter', async () => {
    const mock = new MockAdapter(axios)
    const filters = { capability: 'test', family: 'test', bandlevel: 'test', jobrolename: 'test' }
    const role = { jobRoleID: 1, jobRole: 'test', jobFamilyName: 'test', jobCapability: 'test', jobBandLevel: 'test' }
    const queryString = querystring.stringify(filters)

    mock.onGet('http://localhost:8080/job-roles/getJobRolesFilter?' + queryString).reply(400, role)

    const result = await employeeservice.getJobRolesFilter('', filters)

    expect(result).to.eql(undefined)
    mock.restore()
  })

  it('Should return jobSpec info', async () => {
    const mock = new MockAdapter(axios)
    const jobrole = { jobRoleID: 1, jobRole: 'Software Engineer' }

    mock.onGet('http://localhost:8080/job-roles/getJobSpec/1').reply(200, jobrole)

    const result = await employeeservice.getJobRoleSpec(1)

    expect(result).to.eql(jobrole)
  })

  it('Should return false when 400 error', async () => {
    const mock = new MockAdapter(axios)

    mock.onGet('http://localhost:8080/job-roles/getJobSpec/100').reply(400, '')

    const result = await employeeservice.getJobRoleSpec(100)

    expect(result).to.equal(false)
  })

  it('Should return role matrix array from api', async () => {
    const mock = new MockAdapter(axios)

    const testMatrixOne = { jobRole: 'Dev', capability: 'Engineering', bandLevel: 'Apprentice', jobRoleID: 1 }
    const testMatrixTwo = { jobRole: 'Sec Engineer', capability: 'Cyber Security', bandLevel: 'Consultant', jobRoleID: 2 }
    const testMatrixThree = { jobRole: 'Frontend Dev', capability: 'Engineering', bandLevel: 'Apprentice', jobRoleID: 3 }
    const roleMatrixList = [testMatrixOne, testMatrixTwo, testMatrixThree]

    const bandLevel = ['Apprentice', 'Associate', 'Consultant']

    const capabilities = ['Engineering', 'AI', 'Cyber Security']

    const returnedResponse = { roleMatrixModel: roleMatrixList, bandLevel: bandLevel, capability: capabilities }

    mock.onGet('http://localhost:8080/job-roles/getRoleMatrix').reply(200, returnedResponse)

    const returnedObject = await employeeservice.getRoleMatrix()
    const expected = { headers: ['Band Level', 'Engineering', 'AI', 'Cyber Security'], rows: [['Apprentice', '<a href="http://localhost:3000/jobSpec?jobRoleID=1">Dev</a>, <a href="http://localhost:3000/jobSpec?jobRoleID=3">Frontend Dev</a>', '', ''], ['Associate', '', '', ''], ['Consultant', '', '', '<a href="http://localhost:3000/jobSpec?jobRoleID=2">Sec Engineer</a>']] }

    expect(returnedObject).to.eql(expected)
  })

  it('Role matrix Should return false when 400', async () => {
    const mock = new MockAdapter(axios)

    const testArray = [['Test', 'Test 2'], ['Test 3']]

    mock.onGet('http://localhost:8080/job-roles/getRoleMatrix').reply(400, testArray)

    const result = await employeeservice.getRoleMatrix()

    expect(result).to.be.false // eslint-disable-line
  })

  it('Should add a job role if credentials are correct and return ID', async () => {
    const mock = new MockAdapter(axios)
    const id = 10
    const newJobRole = { jobRole: 'test' }

    mock.onPost('http://localhost:8080/job-roles/addJobRole', newJobRole).reply(200, id)

    const result = await employeeservice.addJobRole(newJobRole)

    expect(result).to.equal(id)
  })

  it('Fails to add a job role and return -1', async () => {
    const mock = new MockAdapter(axios)
    const id = 1
    mock.onPost('http://localhost:8080/job-roles/addJobRole').reply(400, id)

    const newJobRole = { jobRole: 'test' }
    const result = await employeeservice.addJobRole(newJobRole)

    expect(result).to.equal(-1)
  })

  it('Should edit a job role if credentials are correct and return 1', async () => {
    const mock = new MockAdapter(axios)

    const jobRoleID = 100
    const JobRole = { jobRole: 'test' }

    mock.onPost('http://localhost:8080/job-roles/editJobRole/' + jobRoleID, JobRole).reply(200, 1)

    const result = await employeeservice.editJobRole(jobRoleID, JobRole)

    expect(result).to.equal(-1)
  })

  it('Fails to edit a job role and return -1', async () => {
    const mock = new MockAdapter(axios)

    const id = 100
    mock.onPut('http://localhost:8080/job-roles/editJobRole/' + id).reply(400, -1)

    const JobRole = { jobRole: 'test' }
    const result = await employeeservice.editJobRole(id, JobRole)

    expect(result).to.eql(-1)
  })

  it('Should delete a job role and return 1', async () => {
    const mock = new MockAdapter(axios)

    const jobRoleID = 100

    mock.onPost('http://localhost:8080/job-roles/deleteJobRole/' + jobRoleID).reply(200, 1)

    const result = await employeeservice.deleteJobRole(jobRoleID)

    expect(result).to.equal(-1)
  })

  it('Fails to delete a job role and return -1', async () => {
    const mock = new MockAdapter(axios)

    const id = 100
    mock.onPost('http://localhost:8080/job-roles/deleteJobRole/' + id).reply(400, -1)

    const result = await employeeservice.deleteJobRole(id)

    expect(result).to.equal(-1)
  })
})
