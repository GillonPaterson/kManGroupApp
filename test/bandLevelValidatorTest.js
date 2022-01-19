const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const bandLevelValidator = require('../app/validator/bandLevelValidator')

describe('Band Level Validator', function () {
    afterEach(() => {
      sinon.restore()
    })

    it('Should return error message if band level is greater than 40 character', async () => {
        const bandLevel = { jobBandLevel: 'sdvjsbvjdsbvjksbvskdbvADAsvbskvsdkskvsdjvbjkvbsdkjvbsdkvjbsdhbckbdsjclkablbblva' }
        expect(await bandLevelValidator.validateBandLevel(bandLevel)).to.equal('Band Level can be A maximum of 40 characters and must be populated')
    })
    it('Should return error message if band level is empty', async () => {
        const bandLevel = { jobBandLevel: '' }
        expect(await bandLevelValidator.validateBandLevel(bandLevel)).to.equal('Band Level can be A maximum of 40 characters and must be populated')
    })
    it('Should return error message if band level contains numbers', async () => {
        const bandLevel = { jobBandLevel: 'SDDSAjj j sajdjjn1' }
        expect(await bandLevelValidator.validateBandLevel(bandLevel)).to.equal('Band Level must not contain numbers')
    })
    it('Should return error message if band level contains special characters', async () => {
        const bandLevel = { jobBandLevel: 'jasjidsk j! sajdjjn' }
        expect(await bandLevelValidator.validateBandLevel(bandLevel)).to.equal('Band Level must not contain special characters')
    })
    it('Should return null if valid', async () => {
        const bandLevel = { jobBandLevel: 'jasjidJDJ K sajdjjn' }
        expect(await bandLevelValidator.validateBandLevel(bandLevel)).to.be.null
    })
})