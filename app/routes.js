const express = require("express");
const router = express.Router();
const jobrolesservice = require("./jobrolesservice.js");
const app = express();
const port = 3000;
const capabilityValidator = require("./validator/capabilityValidator")

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


router.get("/addrole", async(req, res) =>{
    var bandLevels = await jobrolesservice.getJobBandLevels()
    var family = await jobrolesservice.getJobFamilyNames()

    if(bandLevels != false && family != false){
        res.render('addnewrole.html', {
            jobBandInfo: bandLevels,
            jobFamilyInfo: family
        })
    
    }else{
        res.render('pageNotFound.html')
    }
});

router.post("/addrole", async(req, res) => {
    var id = await jobrolesservice.addJobRole(req.body)

    var roles =  await jobrolesservice.getJobRoles()
    for(i = 0; i < roles.length; i++){
        roles[i].jobBandLevel = "<a href=http://localhost:3000/competencyData?jobRoleID="+roles[i].jobRoleID+">"+roles[i].jobBandLevel+"</a>"
        roles[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID="+roles[i].jobRoleID+">More Info</a>"
    }
    res.render('jobroles.html', { jobroles: roles })
});


router.get("/training", async(req, res) =>{
    var bandLevel = req.query.jobBandLevel
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

router.get("/createCapabilityForm", async(req,res) =>{
    res.render("createCapabilityForm.html")
})

router.post("/addCapability", async(req,res) =>{
    try{
        var capabilty = req.body
        var val = await capabilityValidator.checkCapability(capabilty)
        if (val == "no error"){
            var id =  await jobrolesservice.addCapabilty(capabilty)
            res.render("home.html")
        }else{
           req.body["errormessage"] = val
           res.render('createCapabilityForm.html', req.body)  
        }
    } catch (e){
        console.log(e)
    }


})


router.post("/UpdateCapability", async(req,res) =>{
    try{
        console.log("res "+req.body.capabilityID)
        var capabilityID = req.body.capabilityID
        var capabilityName = req.body.capabilityName
        console.log(capabilityName)
        var capability = {capabilityID: capabilityID, capabilityName: capabilityName}
        var val = await capabilityValidator.checkCapability(capability)
        if (val == "no error"){
            var id =  await jobrolesservice.updateCapabilites(capability)
            res.render("home.html")
        }else{
           req.body["errormessage"] = val
           res.render('updateCapabilities.html', req.body)  
        }
    } catch (e){
        console.log(e)
    }


})

router.get("/viewAllCapabilitiesforUpdate", async(req, res) => { 
    var role =  await jobrolesservice.getAllCapabilitesInfo()
    console.log("kmfkd "+role)
    for(i = 0; i < role.length; i++){
        role[i].leadID = '<a href="http://localhost:3000/updateCapabilityInfo?capabilityID='+role[i].capabilityID+'">More Info</a>'
    }
    res.render('viewAllCapabilities.html', { jobroles: role })
});

router.get("/updateCapabilityInfo", async(req, res) =>{
    var capInfo = await jobrolesservice.getCapabilityLeadInfo(req.query.capabilityID)
    console.log(req.query.capabilityID)
    res.render('updateCapabilities.html', {
        capabilityID: req.query.capabilityID
    })   
 
});


module.exports = router;
