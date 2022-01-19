const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const competenciesValidator = require('../app/validator/competenciesValidator')

describe('Competencies Validator', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('Should return error message if unchecked', async () => {
    const competencies = '_unchecked'
    expect(await competenciesValidator.validateBandLevelCompetencies(competencies)).to.equal('You must select at least one competency')
  })
  it('Should return error message if more than 6 items in array', async () => {
    const competencies = [1, 2, 3, 4, 5, 6, 7]
    expect(await competenciesValidator.validateBandLevelCompetencies(competencies)).to.equal('you can\'t select more that 6 competencies')
  })
  it('Should return null if valid', async () => {
    const competencies = [1, 2, 3, 4, 5, 6]
    expect(await competenciesValidator.validateBandLevelCompetencies(competencies)).to.be.null // eslint-disable-line
  })
})
