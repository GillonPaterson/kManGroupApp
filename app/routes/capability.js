const router = require('express').Router()
const isAdmin = require('../../lib/middleware/authentication/isAdmin.js')
const capabilityValidator = require('../validator/capabilityValidator')
const capabilityService = require('../services/capabilityService')


router.get('/viewAllCapabilities', async (req, res) => {
  var role = await capabilityService.getAllCapabilityLeadsInfo(req.cookies.access_token)
  for (i = 0; i < role.length; i++) {
    role[i].leadID = '<a href="http://localhost:3000/capabilityLeadInfo?leadID=' + role[i].leadID + '">More Info</a>'
  }
  res.render('viewAllCapabilityLeads.html', {
    jobroles: role
  })
})

router.get('/capabilityLeadInfo', async (req, res) => {
  var capInfo = await capabilityService.getCapabilityLeadInfo(req.query.leadID, req.cookies.access_token)
  res.render('viewCapabilityLead.html', {
    rows: capInfo
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

  module.exports = router