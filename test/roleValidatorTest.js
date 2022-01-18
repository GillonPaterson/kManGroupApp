const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const roleValidator = require('../app/validator/roleValidator')

describe('Role Validator', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('Should validate the role name and return error because length is too long', async () => {
    const newRole = { jobRole: 'sdvjsbvjdsbvjksbvskdbvksvbskvsdkskvsdjvbjkvbsdkjvbsdkvjbsdhbckbdsjclkablbblva' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must be less than 40 characters')
  })

  it('Should validate the role name and return error because length its empty', async () => {
    const newRole = { jobRole: '' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must be entered')
  })

  it('Should validate the role name and return error because name contains numbers', async () => {
    const newRole = { jobRole: '4127896328746' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must not contain a number')
  })

  it('Should validate the role name and return error because there is a space at the start or end', async () => {
    const newRole = { jobRole: ' test' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must not contain spaces at the start or end')

    newRole.jobRole = 'test  '
    expect(await roleValidator.checkrole(newRole)).to.equal('The role name must not contain spaces at the start or end')
  })

  it('Should validate the role spec and return error because its empty', async () => {
    const newRole = { jobRole: 'test', jobSpec: '' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The job specification must be entered')
  })

  it('Should validate the role spec and return error because length is too long', async () => {
    const newRole = { jobRole: 'test', jobSpec: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. testestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestestWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. testestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestest' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The job specification must be less than 1000 characters')
  })

  it('Should validate the role link and return error because it doesnt start with https://', async () => {
    const newRole = { jobRole: 'test', jobSpec: 'test', jobLink: 'test.com' }
    expect(await roleValidator.checkrole(newRole)).to.equal("The link must start with 'https://'")
  })

  it('Should validate the role link and return error because it isnt longer than 8 charaters', async () => {
    const newRole = { jobRole: 'test', jobSpec: 'test', jobLink: 'https://' }
    expect(await roleValidator.checkrole(newRole)).to.equal('A link must be entered')
  })

  it('Should validate the role link and return error because length is too long', async () => {
    const newRole = { jobRole: 'test', jobSpec: 'test', jobLink: 'https://What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. testestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestestWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. testestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestest' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The link must be less than 500 characters')
  })

  it('Should validate the role responsibilities and return error because its empty', async () => {
    const newRole = { jobRole: 'test', jobSpec: 'test', jobLink: 'https://test.com', jobResponsibilities: '' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The job responsibilities must be entered')
  })

  it('Should validate the role responsibilities and return error because length is too long', async () => {
    const newRole = { jobRole: 'test', jobSpec: 'test', jobLink: 'https://test.com', jobResponsibilities: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. testestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestestWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. testestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestesttestestestestest' }
    expect(await roleValidator.checkrole(newRole)).to.equal('The job responsibilities must be less than 1000 characters')
  })
})
