const express = require('express')
const router = express.Router()
const jobrolesservice = require('./services/jobrolesservice.js')
const capabilityService = require('./services/capabilityService')
const bandLevelService = require('./services/bandlevelsservice')

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

router.get('/jobroles', async (req, res) => {
  const role = await jobrolesservice.getJobRoles(req.cookies.access_token)
  const bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
  const family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)
  const capability = await capabilityService.getAllCapabilitesInfo(req.cookies.access_token)

  for (let i = 0; i < role.length; i++) {
    role[i].jobBand = '<a href=http://localhost:3000/competencyData?jobRoleID=' + role[i].jobRoleID + '>' + role[i].jobBandLevel + '</a>'
    role[i].viewSpecURL = '<a href=http://localhost:3000/jobSpec?jobRoleID=' + role[i].jobRoleID + '>More Info</a>'
    role[i].editURL = '<a href=http://localhost:3000/editRole?jobRoleID=' + role[i].jobRoleID + '>Edit</a>'
    role[i].deleteURL = '<a href=http://localhost:3000/deleteRole?jobRoleID=' + role[i].jobRoleID + '>Delete</a>'
  }

  res.render('jobroles.html', {
    jobroles: role,
    bandLevels: bandLevels,
    families: family,
    capabilities: capability
  })
})

router.post('/jobroles', async (req, res) => {
  let roledata = req.body

  if (!(roledata.capability === '_unchecked' && roledata.family === '_unchecked' && roledata.bandlevel === '_unchecked' && roledata.jobrolename === '')) {
    const role = await jobrolesservice.getJobRolesFilter(req.cookies.access_token, roledata)
    const bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
    const family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)
    const capability = await capabilityService.getAllCapabilitesInfo(req.cookies.access_token)

    for (let i = 0; i < role.length; i++) {
      role[i].jobBand = '<a href=http://localhost:3000/competencyData?jobRoleID=' + role[i].jobRoleID + '>' + role[i].jobBandLevel + '</a>'
      role[i].viewSpecURL = '<a href=http://localhost:3000/jobSpec?jobRoleID=' + role[i].jobRoleID + '>More Info</a>'
      role[i].editURL = '<a href=http://localhost:3000/editRole?jobRoleID=' + role[i].jobRoleID + '>Edit</a>'
      role[i].deleteURL = '<a href=http://localhost:3000/deleteRole?jobRoleID=' + role[i].jobRoleID + '>Delete</a>'
    }

    res.render('jobroles.html', {
      jobroles: role,
      bandLevels: bandLevels,
      families: family,
      capabilities: capability
    })
  } else {
    res.redirect('/jobroles')
  }
})

router.all('*', async (req, res) => {
  res.redirect('home')
})

module.exports = router
