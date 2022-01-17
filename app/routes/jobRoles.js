const router = require('express').Router()
const isAdmin = require('../../lib/middleware/authentication/isAdmin.js')
const jobrolesservice = require('../services/jobrolesservice.js')
const bandLevelService = require('../services/bandlevelsservice')
const jobFamilyService = require('../services/jobFamilyService')
const roleValidator = require('../validator/roleValidator')

router.get('/jobroles', async (req, res) => {
    var role = await jobrolesservice.getJobRoles(req.cookies.access_token)
  
    for (i = 0; i < role.length; i++) {
      role[i].jobBandLevel = '<a href=http://localhost:3000/competencyData?jobRoleID=' + role[i].jobRoleID + '>' + role[i].jobBandLevel + '</a>'
      role[i].viewSpecURL = '<a href=http://localhost:3000/jobSpec?jobRoleID=' + role[i].jobRoleID + '>More Info</a>'
      role[i].editURL = '<a href=http://localhost:3000/editRole?jobRoleID=' + role[i].jobRoleID + '>Edit</a>'
      role[i].deleteURL = '<a href=http://localhost:3000/deleteRole?jobRoleID=' + role[i].jobRoleID + '>Delete</a>'
    }
    res.render('jobroles.html', {
      jobroles: role
    })
  })
  
  router.get('/jobSpec', async (req, res) => {
    var role = await jobrolesservice.getJobRoleSpec(req.query.jobRoleID, req.cookies.access_token)
    if (role != false) {
      res.render('jobSpec.html', {
        jobRoleInfo: role
      })
    } else {
      res.render('pageNotFound.html')
    }
  })

  router.get('/roleMatrix', async (req, res) => {
    var roleMatrix = await jobrolesservice.getRoleMatrix(req.cookies.access_token)
    res.render('roleMatrix.html', {
      rows: roleMatrix.rows,
      headers: roleMatrix.headers
    })
  })

router.get('/addrole', isAdmin, async (req, res) => {
    var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
    var family = await jobFamilyService.getJobFamilyNames(req.cookies.access_token)
  
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
      var family = await jobFamilyService.getJobFamilyNames(req.cookies.access_token)
  
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
    var family = await jobFamilyService.getJobFamilyNames(req.cookies.access_token)
  
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
      var family = await jobFamilyService.getJobFamilyNames(req.cookies.access_token)
  
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

module.exports = router