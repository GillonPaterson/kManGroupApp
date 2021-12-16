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
    console.log(role)
    res.render('competencyInfo.html', {
        jobRoleInfo: role
    })    
});

router.get("/roleMatrix", async(req, res) =>{
    var roleMatrix = await jobrolesservice.getRoleMatrix()
    res.render('roleMatrix.html', {
        jobroles: roleMatrix
    })    
});

module.exports = router;
