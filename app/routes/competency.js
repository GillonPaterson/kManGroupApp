const router = require('express').Router()
const competencyService = require('../services/competencyService')

router.get('/competencyData', async (req, res) => {
  var role = await competencyService.getCompetencyData(req.query.jobRoleID, req.cookies.access_token)
  res.render('competencyInfo.html', {
    jobRoleInfo: role
  })
})

module.exports = router
