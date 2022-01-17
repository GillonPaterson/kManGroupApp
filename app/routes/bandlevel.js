const router = require('express').Router()
const isAdmin = require('../../lib/middleware/authentication/isAdmin.js')
const bandLevelService = require('../services/bandlevelsservice')
const bandLevelValidator = require('../validator/bandLevelValidator')
const trainingService = require('../services/trainingService')

router.get('/createBandLevel', isAdmin, async (req, res) => {
    var bandlevels = await bandLevelService.getJobBandLevelsAndImportance(req.cookies.access_token)
    res.render('addBand.html', { bandlevels: bandlevels })
  })
  
  router.post('/createBandLevelAddTraining', isAdmin, async (req, res) => {
    let bandLevelInfo =  req.body
    let errorMessage = bandLevelValidator.validateBandLevel(bandLevelInfo)
    if(errorMessage){
      res.redirect('createBandLevel')
    }
    else{
      myCache.set("bandLevelForm", bandLevelInfo)
      let training = await trainingService.getTraining(req.cookies.access_token)
      for(i = 0; i < training.length; i++){
        training[i].trainingLink = '<a href = "' + training[i].trainingLink +'">'+training[i].trainingName+'</a>'
      }
      res.render('addBandAddTraining.html', {training: training})
    }
  })
  
  router.post('/createBandLevelAddCompetencies', isAdmin, async (req, res) => {
    let trainingInfo =  req.body
    myCache.set("trainingInfo", trainingInfo)
    let competencies = await competencyService.getAllCompetencyData(req.cookies.access_token)
    res.render('addBandAddCompetencies.html',{competencies: competencies})
  })
  
router.post('/createBandLevelSubmit', isAdmin, async (req, res) => {
    let competencies =  req.body.competencies
    let training = myCache.take("trainingInfo").training
    let bandLevelInfo = {bandLevel: myCache.take("bandLevelForm"), training, competencies}
    const response = bandLevelService.createBandLevel(bandLevelInfo, req.cookies.access_token)
    res.redirect('home')
})

module.exports = router