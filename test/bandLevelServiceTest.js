const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter')
const bandlevelsservice = require('../app/services/bandlevelsservice.js')
const token = 'testToken'

describe('Band Level Service', function () {
    afterEach(() => {
        sinon.restore()
    })
    it('getJobBandLevels returns list', async () => {
        var mock = new MockAdapter(axios)
        var list = [{bandLevel: 'test'}, {bandLevel: 'test2'}]
        mock.onGet('http://localhost:8080/band-level/getJobBandLevels').reply(200, list)

        var result = await bandlevelsservice.getJobBandLevels(token)
        expect(result).to.eql(list)
    })
    it('getJobBandLevels returns null when error', async () => {
        var mock = new MockAdapter(axios)
        var list = [{bandLevel: 'test'}, {bandLevel: 'test2'}]
        mock.onGet('http://localhost:8080/band-level/getJobBandLevels').reply(400, list)

        var result = await bandlevelsservice.getJobBandLevels(token)
        expect(result).to.be.null
    })

    it('getJobBandLevelsAndImportance returns list', async () => {
        var mock = new MockAdapter(axios)
        var list = [{bandLevel: 'test', importance: '1'}, {bandLevel: 'test2', importance: '2'}]
        mock.onGet('http://localhost:8080/band-level/getJobBandLevelsAndImportance').reply(200, list)

        var result = await bandlevelsservice.getJobBandLevelsAndImportance(token)
        expect(result).to.eql(list)
    })
    it('getJobBandLevelsAndImportance returns null when error', async () =>{
        var mock = new MockAdapter(axios)
        var list = [{bandLevel: 'test', importance: '1'}, {bandLevel: 'test2', importance: '2'}]
        mock.onGet('http://localhost:8080/band-level/getJobBandLevelsAndImportance').reply(400, list)

        var result = await bandlevelsservice.getJobBandLevelsAndImportance(token)
        expect(result).to.be.null
    })

    it('createBandLevel returns nothing', async () =>{
        var mock = new MockAdapter(axios)
        var test = {bandlevel: 'test'}
        mock.onPost('http://localhost:8080/band-level/createBandLevel', test).reply(200)

        var result = await bandlevelsservice.createBandLevel(test, token)
        expect(result).to.be.undefined
    })
    it('createBandLevel returns false when error', async () => {
        var mock = new MockAdapter(axios)
        var test = {bandlevel: 'test'}
        mock.onPost('http://localhost:8080/band-level/createBandLevel',test).reply(400)

        var result = await bandlevelsservice.createBandLevel(test,token)
        expect(result).to.be.false
    })
})