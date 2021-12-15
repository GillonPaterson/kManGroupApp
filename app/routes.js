const express = require("express");
const router = express.Router();
const jobrolesservice = require("./jobrolesservice.js");


const NodeCache = require("node-cache");
const myCache = new NodeCache();


router.get("/home", async(req, res) =>{
    res.render('home.html')
});

router.get("/jobroles", async(req, res) => { 
    var role =  await jobrolesservice.getJobRoles()
    for(i = 0; i < role.length; i++){
        role[i].jobBandLevel = "<a href=http://localhost:3000/competencyData?bandLevel="+role[i].jobBandLevel.toLowerCase()+">"+role[i].jobBandLevel+"</a>"
        role[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID="+role[i].jobRoleID+">More Info</a>"
    }
    res.render('jobroles.html', { jobroles: role })
});

router.get("/jobSpec", async(req, res) =>{
    var role = await jobrolesservice.getJobRoleSpec(req.query.jobRoleID)
    res.render('jobSpec.html', {
        jobRoleInfo: role[0]
    })
});    

router.get("/competencyData", async(req, res) =>{
    var role = await jobrolesservice.getCompetencyData(req.query.bandLevel)
    console.log(role)
    res.render('competencyInfo.html', {
        jobRoleInfo: role[0]
    })    
});

module.exports = router;
