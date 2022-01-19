const router = require('express').Router()
const isAdmin = require('../../lib/middleware/authentication/isAdmin.js')
const bandLevelService = require('../services/bandlevelsservice')
const bandLevelValidator = require('../validator/bandLevelValidator')
const competenciesValidator = require('../validator/competenciesValidator')
const trainingValidator = require('../validator/trainingValidator')
const trainingService = require('../services/trainingService')
const competencyService = require('../services/competencyService')
const NodeCache = require('node-cache')
const myCache = new NodeCache()

router.get('/createBandLevel', isAdmin, async (req, res) => {
  var bandlevels = await bandLevelService.getJobBandLevelsAndImportance(req.cookies.access_token)
  if(bandlevels === null){
    res.redirect('serviceUnavailable')
  }
  else{
    res.render('addBand.html', { bandlevels: bandlevels })
  }
})

router.post('/createBandLevelAddTraining', isAdmin, async (req, res) => {
  var bandLevelInfo = req.body
  bandLevelInfo.jobBandLevel = bandLevelInfo.jobBandLevel.trim()
  const errorMessage = await bandLevelValidator.validateBandLevel(bandLevelInfo)
  if (errorMessage !== null) {
    var bandlevels = await bandLevelService.getJobBandLevelsAndImportance(req.cookies.access_token)
    if(bandlevels === null){
      res.redirect('serviceUnavailable')
    }
    else{
    res.render('addBand.html', {
      bandlevels: bandlevels,
      errormessage: errorMessage
    })
  }
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
  const trainingInfo = req.body.training
  const errormessage = await trainingValidator.validateBandLevelTraining(trainingInfo)
  if (errormessage !== null) {
    const training = await trainingService.getTraining(req.cookies.access_token)
    for (let i = 0; i < training.length; i++) {
      training[i].trainingLink = '<a href = "' + training[i].trainingLink + '">' + training[i].trainingName + '</a>'
    }
    res.render('addBandAddTraining.html', {
      training: training,
      errormessage: errormessage
    })
  } else {
    myCache.set('trainingInfo', trainingInfo)
    const competencies = await competencyService.getAllCompetencyData(req.cookies.access_token)
    res.render('addBandAddCompetencies.html', { competencies: competencies })
  }
})

router.post('/createBandLevelSubmit', isAdmin, async (req, res) => {
  const competencies = req.body.competencies
  const errormessage = await competenciesValidator.validateBandLevelCompetencies(competencies)
  if (errormessage !== null) {
    const competencies = await competencyService.getAllCompetencyData(req.cookies.access_token)
    res.render('addBandAddCompetencies.html', {
      competencies: competencies,
      errormessage: errormessage
    })
  } else {
    const training = myCache.get('trainingInfo')
    const bandLevelInfo = { bandLevel: myCache.get('bandLevelForm'), training, competencies }
    var error = await bandLevelService.createBandLevel(bandLevelInfo, req.cookies.access_token)
    myCache.flushAll()
    if(error === false){
      res.render('serviceUnavailable.html')
    }
    else{
    res.redirect('home')
    }
  }
})

module.exports = router
