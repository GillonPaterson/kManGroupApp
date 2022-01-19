const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const trainingValidator = require('../app/validator/trainingValidator')

describe('Competencies Validator', function () {
    afterEach(() => {
      sinon.restore()
    })

    it('Should return error message if unchecked', async () => {
        const training = '_unchecked'
        expect(await trainingValidator.validateBandLevelTraining(training)).to.equal('You must select at least one training')
    })
    it('Should return error message if more than 6 items in array', async () => {
        const training = [1,2,3,4,5,6,7]
        expect(await trainingValidator.validateBandLevelTraining(training)).to.equal('you can\'t select more that 6 trainings')
    })
    it('Should return null if valid', async () => {
        const training = [1,2,3,4,5,6]
        expect(await trainingValidator.validateBandLevelTraining(training)).to.be.null
    })
})