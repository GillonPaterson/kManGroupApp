const router = require('express').Router()
const isAdmin = require('../../lib/middleware/authentication/isAdmin.js')
const jobrolesservice = require('../services/jobrolesservice.js')
const bandLevelService = require('../services/bandlevelsservice')
const roleValidator = require('../validator/roleValidator')
const capabilityValidator = require('../validator/capabilityValidator')
const capabilityService = require('../services/capabilityService')
const loginService = require('../services/loginService.js')

router.get('/addrole', isAdmin, async (req, res) => {
  var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
  var family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)

  if (bandLevels != false && family != false) {
    res.render('addnewrole.html', {
      jobBandInfo: bandLevels,
      jobFamilyInfo: family
    })
  } else {
    res.render('pageNotFound.html')
  }
})

router.post('/addrole', isAdmin, async (req, res) => {
  var link = req.body.jobLink

  if (link.includes('https://https://')) {
    link = link.slice(8, link.length)
  } else if (link.includes('https://http://')) {
    link = link.replace('http://', '')
  }

  req.body.jobLink = link

  var role = req.body

  var val = await roleValidator.checkrole(role)

  if (val == 'No error') {
    var id = await jobrolesservice.addJobRole(req.body, req.cookies.access_token)
    res.redirect('/jobroles')
  } else {
    req.body.errormessage = val

    var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
    var family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)

    res.render('addnewrole.html', {
      errormessage: req.body.errormessage,
      jobBandInfo: bandLevels,
      jobFamilyInfo: family
    })
  }
})

router.get('/editrole', isAdmin, async (req, res) => {
  var role = await jobrolesservice.getJobRole(req.query.jobRoleID, req.cookies.access_token)
  var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
  var family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)

  bandLevels = bandLevels.reverse()

  if (bandLevels != false && family != false) {
    res.render('editrole.html', {
      jobRoleInfo: role,
      jobBandInfo: bandLevels,
      jobFamilyInfo: family
    })
  } else {
    res.render('pageNotFound.html')
  }
})

router.post('/editrole', isAdmin, async (req, res) => {
  var link = req.body.jobLink

  if (link.includes('https://https://')) { link = link.slice(8, link.length) } else if (link.includes('https://http://')) { link = link.replace('http://', '') }

  req.body.jobLink = link

  var role = req.body
  var edit = {
    jobRole: role.jobRole,
    jobBandLevelID: role.jobBandLevel,
    jobSpec: role.jobSpec,
    jobLink: role.jobLink,
    jobResponsibilities: role.jobResponsibilities,
    jobFamilyID: role.jobFamily
  }

  var val = await roleValidator.checkrole(role)
  if (val == 'No error') {
    var id = await jobrolesservice.editJobRole(role.jobRoleID, edit, req.cookies.access_token)
    res.redirect('jobRoles')
  } else {
    req.body.errormessage = val

    console.log(req.body.jobRoleID)
    var role = await jobrolesservice.getJobRole(req.body.jobRoleID, req.cookies.access_token)
    var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
    var family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)

    bandLevels = bandLevels.reverse()

    res.render('editrole.html', {
      errormessage: req.body.errormessage,
      jobRoleInfo: role,
      jobBandInfo: bandLevels,
      jobFamilyInfo: family
    })
  }
})

router.get('/deleterole', isAdmin, async (req, res) => {
  var role = await jobrolesservice.getJobRole(req.query.jobRoleID, req.cookies.access_token)

  if (role != false) {
    res.render('deleterole.html', {
      jobRoleInfo: role
    })
  } else {
    res.render('pageNotFound.html')
  }
})

router.post('/deleterole', isAdmin, async (req, res) => {
  var id = await jobrolesservice.deleteJobRole(req.body.jobRoleID, req.cookies.access_token)
  var roles = await jobrolesservice.getJobRoles(req.cookies.access_token)

  for (i = 0; i < roles.length; i++) {
    roles[i].jobBandLevel = '<a href=http://localhost:3000/competencyData?jobRoleID=' + roles[i].jobRoleID + '>' + roles[i].jobBandLevel + '</a>'
    roles[i].viewSpecURL = '<a href=http://localhost:3000/jobSpec?jobRoleID=' + roles[i].jobRoleID + '>More Info</a>'
    roles[i].editURL = '<a href=http://localhost:3000/editRole?jobRoleID=' + roles[i].jobRoleID + '>Edit</a>'
    roles[i].deleteURL = '<a href=http://localhost:3000/deleteRole?jobRoleID=' + roles[i].jobRoleID + '>Delete</a>'
  }
  res.render('jobroles.html', {
    jobroles: roles
  })
})

router.get('/createCapabilityForm', isAdmin, async (req, res) => {
  res.render('createCapabilityForm.html')
})

router.post('/addCapability', isAdmin, async (req, res) => {
  try {
    var capabilty = req.body
    var val = await capabilityValidator.checkCapability(capabilty)
    if (val == 'no error') {
      var id = await capabilityService.addCapabilty(capabilty, req.cookies.access_token)
      res.redirect('/viewAllCapabilitiesforUpdate')
    } else {
      req.body.errormessage = val
      res.render('createCapabilityForm.html', req.body)
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/UpdateCapability', isAdmin, async (req, res) => {
  try {
    console.log('res ' + req.body.capabilityID)
    var capabilityID = req.body.capabilityID
    var capabilityName = req.body.capabilityName
    console.log(capabilityName)
    var capability = {
      capabilityID: capabilityID,
      capabilityName: capabilityName
    }
    var val = await capabilityValidator.checkCapability(capability)

    if (val == 'no error') {
      var id = await capabilityService.updateCapabilites(capability, req.cookies.access_token)
      console.log('Hello')
      res.redirect('/viewAllCapabilitiesforUpdate')
    } else {
      req.body.errormessage = val
      res.render('updateCapabilities.html', req.body)
    }
  } catch (e) {
    console.log(e)
  }
})

router.get('/viewAllCapabilitiesforUpdate', isAdmin, async (req, res) => {
  var role = await capabilityService.getAllCapabilitesInfo(req.cookies.access_token)
  for (i = 0; i < role.length; i++) {
    role[i].leadID = '<a href="http://localhost:3000/updateCapabilityInfo?capabilityID=' + role[i].capabilityID + '">Update Capability</a>'
  }
  res.render('viewAllCapabilities.html', {
    jobroles: role
  })
})

router.get('/updateCapabilityInfo', isAdmin, async (req, res) => {
  var capInfo = await capabilityService.getCapabilityLeadInfo(req.query.capabilityID, req.cookies.access_token)
  console.log(req.query.capabilityID)
  res.render('updateCapabilities.html', {
    capabilityID: req.query.capabilityID
  })
})

router.get('/createUser', isAdmin, async (req, res) => {
  res.render('createUser.html')
})

router.post('/createUser', isAdmin, async (req, res) => {
  var response = loginService.createUser(req.body, req.cookies.access_token)
  res.redirect('home')
})

router.get('/createBandLevel', isAdmin, async (req, res) => {
  var bandlevels = await bandLevelService.getJobBandLevelsAndImportance(req.cookies.access_token)
  res.render('addBand.html', { bandlevels: bandlevels })
})

router.post('/createBandLevelAddTraining', isAdmin, async (req, res) => {
  var response = loginService.createUser(req.body, req.cookies.access_token)
  res.redirect('home')
})

module.exports = router
