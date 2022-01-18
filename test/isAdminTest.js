const { assert } = require('chai')
const sinon = require('sinon')
const next = sinon.spy()

const mockResponse = (credentials) => {
  const res = {}
  res.status = sinon.stub().returns(res)
  res.redirect = sinon.stub().returns(res)
  res.locals = {}
  res.locals.auth = credentials
  return res
}

const isAdmin = require('../lib/middleware/authentication/isAdmin.js')

describe('isAdmin', () => {
  describe('no credentials', () => {
    it('should return status 403 and redirect to login', () => {
      var res = mockResponse()
      isAdmin({}, res, next)
      assert(res.status.calledWith(403))
      assert(res.redirect.calledWith('login'))
    })
  })
  describe('non admin credentials', () => {
    it('should return status 401 and redirect to home', () => {
      var res = mockResponse({ username: 'test', isAdmin: false })
      isAdmin({}, res, next)
      assert(res.status.calledWith(401))
      assert(res.redirect.calledWith('home'))
    })
  })

  describe('admin credentials', () => {
    it('should call next()', () => {
      var res = mockResponse({ username: 'test', isAdmin: true })
      isAdmin({}, res, next)
      assert(next.called)
    })
  })
})
