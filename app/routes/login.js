const router = require('express').Router()
const isAdmin = require('../../lib/middleware/authentication/isAdmin.js')
const loginService = require('../services/loginService.js')

router.get('/login', async (req, res) => {
  res.render('login.html')
})

router.post('/login', async (req, res) => {
  var response = await loginService.login(req.body)
  if (!response) {
    res.render('login', {
      errormessage: 'Login Failed'
    })
  } else {
    return res
      .cookie('access_token', response, {
        httpOnly: true
      })
      .status(200)
      .redirect('home')
  }
})

router.get('/logout', (req, res) => {
  return res
    .clearCookie('access_token')
    .status(200)
    .render('logout.html')
})

router.get('/createUser', isAdmin, async (req, res) => {
  res.render('createUser.html')
})

router.post('/createUser', isAdmin, async (req, res) => {
  loginService.createUser(req.body, req.cookies.access_token)
  res.redirect('home')
})

module.exports = router
