const router = require('express').Router()
const trainingService = require('../services/trainingService.js')

router.get('/training', async (req, res) => {
    var bandLevel = req.query.jobBandLevel
    var role = await trainingService.getJobTraining(bandLevel, req.cookies.access_token)
    var roleDP = role.DPGroup
    var rolePS = role.PSGroup
    var roleTS = role.TSGroup
  
    for (i = 0; i < roleDP.length; i++) {
      roleDP[i].trainingLink = '<a href=' + roleDP[i].trainingLink + '>View course</a>'
    }
  
    for (i = 0; i < rolePS.length; i++) {
      rolePS[i].trainingLink = '<a href=' + rolePS[i].trainingLink + '>View course</a>'
    }
  
    for (i = 0; i < roleTS.length; i++) {
      roleTS[i].trainingLink = '<a href=' + roleTS[i].trainingLink + '>View course</a>'
    }
  
    res.render('training.html', {
      jobRoleInfo: bandLevel,
      DPtrainingcourses: roleDP,
      PStrainingcourses: rolePS,
      TStrainingcourses: roleTS
    })
  })

  module.exports = router