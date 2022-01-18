const router = require('express').Router()
const isAdmin = require('../../lib/middleware/authentication/isAdmin.js')
const bandLevelService = require('../services/bandlevelsservice')
const bandLevelValidator = require('../validator/bandLevelValidator')
const trainingService = require('../services/trainingService')
const competencyService = require('../services/competencyService')
const NodeCache = require('node-cache')
const myCache = new NodeCache()

router.get('/createBandLevel', isAdmin, async (req, res) => {
  var bandlevels = await bandLevelService.getJobBandLevelsAndImportance(req.cookies.access_token)
  res.render('addBand.html', { bandlevels: bandlevels })
})

router.post('/createBandLevelAddTraining', isAdmin, async (req, res) => {
  const bandLevelInfo = req.body
  const errorMessage = bandLevelValidator.validateBandLevel(bandLevelInfo)
  if (errorMessage) {
    res.redirect('createBandLevel')
  } else {
    myCache.set('bandLevelForm', bandLevelInfo)
    const training = await trainingService.getTraining(req.cookies.access_token)
    for (let i = 0; i < training.length; i++) {
      training[i].trainingLink = '<a href = "' + training[i].trainingLink + '">' + training[i].trainingName + '</a>'
    }
    res.render('addBandAddTraining.html', { training: training })
  }
})

router.post('/createBandLevelAddCompetencies', isAdmin, async (req, res) => {
  const trainingInfo = req.body
  myCache.set('trainingInfo', trainingInfo)
  const competencies = await competencyService.getAllCompetencyData(req.cookies.access_token)
  res.render('addBandAddCompetencies.html', { competencies: competencies })
})

router.post('/createBandLevelSubmit', isAdmin, async (req, res) => {
  const competencies = req.body.competencies
  const training = myCache.take('trainingInfo').training
  const bandLevelInfo = { bandLevel: myCache.take('bandLevelForm'), training, competencies }
  bandLevelService.createBandLevel(bandLevelInfo, req.cookies.access_token)
  res.redirect('home')
})

module.exports = router
