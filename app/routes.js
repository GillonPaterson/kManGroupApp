const express = require('express')
const router = express.Router()

router.use('/', require('./routes/capability'))
router.use('/', require('./routes/competency'))
router.use('/', require('./routes/jobFamilies'))
router.use('/', require('./routes/jobRoles'))
router.use('/', require('./routes/login'))
router.use('/', require('./routes/training'))

router.get('/home', async (req, res) => {
  if (res.locals.auth.isAdmin) {
    res.render('adminHome.html')
  } else {
    res.render('home.html')
  }
})

router.get('/employeeHome', async (req, res) => {
  res.render('home.html')
})

router.all('*', async (req, res) => {
  res.redirect('home')
})

module.exports = router
