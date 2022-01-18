const router = require('express').Router()
const jobFamilyService = require('../services/jobFamilyService')

router.get('/jobFamilies', async (req, res) => {
  var jobFamilies = await jobFamilyService.getJobFamilies(req.cookies.access_token)
  res.render('jobFamilies.html', {
    rows: jobFamilies,
    object: 'hi',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Emblem-extra-cool.svg/1200px-Emblem-extra-cool.svg.png'
  })
})

module.exports = router
