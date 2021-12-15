const express = require("express");
const router = express.Router();
const jobrolesservice = require("./jobrolesservice.js");


const NodeCache = require("node-cache");
const myCache = new NodeCache();


router.get("/jobroles", async(req, res) => { 
    var role =  await jobrolesservice.getJobRoles()
    console.log(role)
    for(i = 0; i < role.length; i++){
        role[i].jobBandLevel = "<a href=http://localhost:3000/"+role[i].jobBandLevel.toLowerCase()+"competencies.html> "+role[i].jobBandLevel+"</a>"
        role[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID="+role[i].jobRoleID+">More Info</a>"
    }
    res.render('jobroles.html', { jobroles: role })
});

router.get("/jobSpec", async(req, res) =>{
    var role = await jobrolesservice.getJobRoleSpec(req.query.jobRoleID)
    console.log(role[0].jobRole)
    res.render('jobSpec.html', {
        jobRoleInfo: role[0]
    })
});

module.exports = router;