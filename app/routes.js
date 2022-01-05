const express = require("express");
const router = express.Router();
const jobrolesservice = require("./jobrolesservice.js");
const app = express();
const port = 3000;

app.set('view engine', 'pug');
router.use


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
    var bandLevel = req.query.jobBandLevel
    console.log(bandLevel)
    var role = await jobrolesservice.getJobTraining(bandLevel)
    var roleDP = role.DPGroup
    var rolePS = role.PSGroup
    var roleTS = role.TSGroup
    

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
        rows: roleMatrix.rows,
        headers: roleMatrix.headers
    })    
});

router.get("/jobFamilies", async(req, res) =>{
    var jobFamilies = await jobrolesservice.getJobFamilies()
    res.render('jobFamilies.html', {
        rows: jobFamilies,
        object: "hi" ,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Emblem-extra-cool.svg/1200px-Emblem-extra-cool.svg.png"
    })    
});



router.get("/viewAllCapabilities", async(req, res) => { 
    var role =  await jobrolesservice.getAllCapabilityLeadsInfo()
    for(i = 0; i < role.length; i++){
        role[i].leadID = '<a href="http://localhost:3000/capabilityLeadInfo?leadID='+role[i].leadID+'">More Info</a>'
    }
    res.render('viewAllCapabilites.html', { jobroles: role })
});

router.get("/capabilityLeadInfo", async(req, res) =>{
    var capInfo = await jobrolesservice.getCapabilityLeadInfo(req.query.leadID)
    res.render('viewCapabilityLead.html', {
        rows: capInfo
    })   
 
});


module.exports = router;
