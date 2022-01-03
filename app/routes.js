const express = require("express");
const router = express.Router();
const jobrolesservice = require("./jobrolesservice.js");
const app = express();
const port = 3000;

app.set('view engine', 'pug');


const NodeCache = require("node-cache");
const myCache = new NodeCache();


router.get("/home", async(req, res) =>{
    res.render('home.html')
});

router.get("/jobroles", async(req, res) => { 
    var role =  await jobrolesservice.getJobRoles()
    for(i = 0; i < role.length; i++){
        role[i].jobBandLevel = "<a href=http://localhost:3000/competencyData?jobRoleID="+role[i].jobRoleID+">"+role[i].jobBandLevel+"</a>"
        role[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID="+role[i].jobRoleID+">More Info</a>"
    }
    res.render('jobroles.html', { jobroles: role })
});

router.get("/jobSpec", async(req, res) =>{
    var role = await jobrolesservice.getJobRoleSpec(req.query.jobRoleID)
    if(role != false){
        res.render('jobSpec.html', {
            jobRoleInfo: role
        })
    }else{
        res.render('pageNotFound.html')
    }
});    

router.get("/competencyData", async(req, res) =>{
    var role = await jobrolesservice.getCompetencyData(req.query.jobRoleID)
    res.render('competencyInfo.html', {
        jobRoleInfo: role
    })    
});


router.get("/training", async(req, res) =>{

    var roleDP = await jobrolesservice.getJobTrainingDP(req.query.jobBandLevel)
    var rolePS = await jobrolesservice.getJobTrainingPS(req.query.jobBandLevel)
    var roleTS = await jobrolesservice.getJobTrainingTS(req.query.jobBandLevel)
    var bandLevel = req.query.jobBandLevel

    for(i = 0; i < roleDP.length; i++){
        roleDP[i].trainingLink = "<a href=" + roleDP[i].trainingLink + ">View course</a>"
    }

    for(i = 0; i < rolePS.length; i++){
        rolePS[i].trainingLink = "<a href=" + rolePS[i].trainingLink + ">View course</a>"
    }

    for(i = 0; i < roleTS.length; i++){
        roleTS[i].trainingLink = "<a href=" + roleTS[i].trainingLink + ">View course</a>"
    }

    res.render('training.html', {
        jobRoleInfo: bandLevel,
        DPtrainingcourses: roleDP,
        PStrainingcourses: rolePS,
        TStrainingcourses: roleTS
    })
  });


router.get("/roleMatrix", async(req, res) =>{
    var roleMatrix = await jobrolesservice.getRoleMatrix()
    res.render('roleMatrix.html', {
        jobroles: roleMatrix

    })    
});


module.exports = router;
