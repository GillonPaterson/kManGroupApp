const express = require("express");
const router = express.Router();
const jobrolesservice = require("./services/jobrolesservice.js");
const roleValidator = require("./validator/roleValidator");
const auth = require("./authoriser.js");
const loginService = require("./loginService.js");

const tempservice = require("./tempservice.js");

const cookieParser = require("cookie-parser");
const capabilityValidator = require("./validator/capabilityValidator")
const bandLevelService = require("./services/bandlevelsservice")
const competencyService = require("./services/competencyService")
const capabilityService = require("./services/capabilityService")


router.use(cookieParser())


const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get("/",[auth.isAuthorised], async(req, res) =>{
    res.redirect('home')
});

router.get("/home",[auth.isAuthorised], async(req, res) =>{
    if(auth.tokenVerifier(req.cookies.access_token).isAdmin){
        res.render('adminHome.html')
    }else{
        res.render('home.html')
    }
});

router.get("/employeeHome",[auth.isAdmin], async(req, res) =>{
    res.render('home.html')
});

router.get("/jobroles",[auth.isAuthorised], async(req, res) => { 
    var role =  await jobrolesservice.getJobRoles(req.cookies.access_token)
    
    for(i = 0; i < role.length; i++){
        role[i].jobBandLevel = "<a href=http://localhost:3000/competencyData?jobRoleID="+role[i].jobRoleID+">"+role[i].jobBandLevel+"</a>"
        role[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID="+role[i].jobRoleID+">More Info</a>"
        role[i].editURL = "<a href=http://localhost:3000/editRole?jobRoleID="+role[i].jobRoleID+">Edit</a>"
        role[i].deleteURL = "<a href=http://localhost:3000/deleteRole?jobRoleID=" + role[i].jobRoleID + ">Delete</a>"
    }
    res.render('jobroles.html', { jobroles: role })
});

router.get("/jobSpec", [auth.isAuthorised],async(req, res) =>{
    var role = await jobrolesservice.getJobRoleSpec(req.query.jobRoleID,req.cookies.access_token)
    if(role != false){
        res.render('jobSpec.html', {
            jobRoleInfo: role
        })
    }else{
        res.render('pageNotFound.html')
    }
});    

router.get("/competencyData", [auth.isAuthorised],async(req, res) =>{
    var role = await competencyService.getCompetencyData(req.query.jobRoleID,req.cookies.access_token)
    res.render('competencyInfo.html', {
        jobRoleInfo: role
    })    
});


router.get("/addrole", [auth.isAdmin],async(req, res) =>{
    var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
    var family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)

    if(bandLevels != false && family != false){
        res.render('addnewrole.html', {
            jobBandInfo: bandLevels,
            jobFamilyInfo: family
        })
    
    }else{
        res.render('pageNotFound.html')
    }
});

router.post("/addrole",[auth.isAdmin], async(req, res) => {
    var link = req.body.jobLink

    if(link.includes("https://https://"))
        link = link.slice(8, link.length)
    else if(link.includes("https://http://"))
        link = link.replace("http://", "")

    req.body.jobLink = link;

    var role = req.body

    var val = await roleValidator.checkrole(role)

if (val == "No error") {
    var id = await jobrolesservice.addJobRole(req.body,req.cookies.access_token)

    var roles =  await jobrolesservice.getJobRoles()
    for(i = 0; i < roles.length; i++){
        roles[i].jobBandLevel = "<a href=http://localhost:3000/competencyData?jobRoleID="+roles[i].jobRoleID+">"+roles[i].jobBandLevel+"</a>"
        roles[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID="+roles[i].jobRoleID+">More Info</a>"
        roles[i].editURL = "<a href=http://localhost:3000/editRole?jobRoleID="+roles[i].jobRoleID+">Edit</a>"
        roles[i].deleteURL = "<a href=http://localhost:3000/deleteRole?jobRoleID=" + roles[i].jobRoleID + ">Delete</a>"
    }
    res.render('jobroles.html', { jobroles: roles })
}
else {
    req.body["errormessage"] = val

    var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
    var family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)

        res.render('addnewrole.html', {
            errormessage: req.body.errormessage,
            jobBandInfo: bandLevels,
            jobFamilyInfo: family
        })
}
});



router.get("/editrole",[auth.isAdmin], async(req, res) =>{

    var role = await tempservice.getJobRole(req.query.jobRoleID,req.cookies.access_token)
    var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
    var family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)


    bandLevels = bandLevels.reverse();

    console.log(bandLevels)
    console.log(family)
    console.log(role)

    if(bandLevels != false && family != false){
        res.render('editrole.html', {
            jobRoleInfo: role,
            jobBandInfo: bandLevels,
            jobFamilyInfo: family
        })
    
    }else{
        res.render('pageNotFound.html')
    }
});


router.post("/editrole",[auth.isAdmin], async(req, res) => {
    var link = req.body.jobLink

    if(link.includes("https://https://"))
        link = link.slice(8, link.length)
    else if(link.includes("https://http://"))
        link = link.replace("http://", "")

    req.body.jobLink = link;

    var role = req.body
    var edit = { jobRole: role.jobRole, jobBandLevelID: role.jobBandLevel, jobSpec: role.jobSpec, jobLink: role.jobLink, jobResponsibilities: role.jobResponsibilities, jobFamilyID: role.jobFamily }

    var val = await roleValidator.checkrole(role)

if (val == "No error") {

    var id = await tempservice.editJobRole(role.jobRoleID, edit, req.cookies.access_token)

    var roles =  await jobrolesservice.getJobRoles(req.cookies.access_token)
    for(i = 0; i < roles.length; i++){
        roles[i].jobBandLevel = "<a href=http://localhost:3000/competencyData?jobRoleID="+roles[i].jobRoleID+">"+roles[i].jobBandLevel+"</a>"
        roles[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID="+roles[i].jobRoleID+">More Info</a>"
        roles[i].editURL = "<a href=http://localhost:3000/editRole?jobRoleID="+roles[i].jobRoleID+">Edit</a>"
        roles[i].deleteURL = "<a href=http://localhost:3000/deleteRole?jobRoleID=" + roles[i].jobRoleID + ">Delete</a>"
    }
    res.render('jobroles.html', { jobroles: roles })
}
else {
    req.body["errormessage"] = val


    console.log(req.body.jobRoleID)
    var role = await tempservice.getJobRole(req.body.jobRoleID,req.cookies.access_token)
    var bandLevels = await bandLevelService.getJobBandLevels(req.cookies.access_token)
    var family = await jobrolesservice.getJobFamilyNames(req.cookies.access_token)


    bandLevels = bandLevels.reverse();

        res.render('editrole.html', {
            errormessage: req.body.errormessage,
            jobRoleInfo: role,
            jobBandInfo: bandLevels,
            jobFamilyInfo: family
        })
}
});

router.get("/deleterole",[auth.isAdmin], async(req, res) =>{

    var role = await tempservice.getJobRole(req.query.jobRoleID,req.cookies.access_token)

    if(role != false){
        res.render('deleterole.html', {
            jobRoleInfo: role
        })
    
    }else{
        res.render('pageNotFound.html')
    }
});

router.post("/deleterole",[auth.isAdmin], async(req, res) => {
        var id = await jobrolesservice.deleteJobRole(req.body.jobRoleID, req.cookies.access_token)
        var roles =  await jobrolesservice.getJobRoles(req.cookies.access_token)

        for(i = 0; i < roles.length; i++){
            roles[i].jobBandLevel = "<a href=http://localhost:3000/competencyData?jobRoleID="+roles[i].jobRoleID+">"+roles[i].jobBandLevel+"</a>"
            roles[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID="+roles[i].jobRoleID+">More Info</a>"
            roles[i].editURL = "<a href=http://localhost:3000/editRole?jobRoleID="+roles[i].jobRoleID+">Edit</a>"
            roles[i].deleteURL = "<a href=http://localhost:3000/deleteRole?jobRoleID=" + roles[i].jobRoleID + ">Delete</a>"
        }
        res.render('jobroles.html', { jobroles: roles })

});


router.get("/training",[auth.isAuthorised], async(req, res) =>{
    var bandLevel = req.query.jobBandLevel
    var role = await jobrolesservice.getJobTraining(bandLevel,req.cookies.access_token)
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


router.get("/roleMatrix", [auth.isAuthorised],async(req, res) =>{
    var roleMatrix = await jobrolesservice.getRoleMatrix(req.cookies.access_token)
    res.render('roleMatrix.html', {
        rows: roleMatrix.rows,
        headers: roleMatrix.headers
    })    
});

router.get("/jobFamilies", [auth.isAuthorised],async(req, res) =>{
    var jobFamilies = await jobrolesservice.getJobFamilies(req.cookies.access_token)
    res.render('jobFamilies.html', {
        rows: jobFamilies,
        object: "hi" ,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Emblem-extra-cool.svg/1200px-Emblem-extra-cool.svg.png"
    })    
});



router.get("/viewAllCapabilities",[auth.isAuthorised], async(req, res) => { 
    var role =  await capabilityService.getAllCapabilityLeadsInfo(req.cookies.access_token)
    for(i = 0; i < role.length; i++){
        role[i].leadID = '<a href="http://localhost:3000/capabilityLeadInfo?leadID='+role[i].leadID+'">More Info</a>'
    }
    res.render('viewAllCapabilityLeads.html', { jobroles: role })
});

router.get("/capabilityLeadInfo",[auth.isAuthorised], async(req, res) =>{
    var capInfo = await capabilityService.getCapabilityLeadInfo(req.query.leadID,req.cookies.access_token)
    res.render('viewCapabilityLead.html', {
        rows: capInfo
    })   
 
});

router.get("/login", async(req,res) =>{
    res.render('login.html')
})

router.post("/login", async(req,res) =>{
    var response = await loginService.login(req.body)
    if(!response){
        res.render("login", {errormessage: "Login Failed"})
    }else{
    return res
        .cookie("access_token", response, {
        httpOnly: true,
        })
        .status(200)
        .redirect("home")
    }
})

router.get("/createUser",[auth.isAdmin] , async(req,res) =>{
    res.render('createUser.html')
})

router.post("/createUser",[auth.isAdmin]  ,async(req,res) =>{
    var response = loginService.createUser(req.body,req.cookies.access_token)
    res.redirect("home")
})

  router.get("/logout", [auth.isAuthorised], (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .render("logout.html");
  });

router.get("/createCapabilityForm", [auth.isAdmin], async(req,res) =>{
    res.render("createCapabilityForm.html")
})

router.post("/addCapability",[auth.isAdmin], async(req,res) =>{
    try{
        var capabilty = req.body
        var val = await capabilityValidator.checkCapability(capabilty)
        if (val == "no error"){
            var id =  await capabilityService.addCapabilty(capabilty,req.cookies.access_token)
            res.redirect("/viewAllCapabilitiesforUpdate")
        }else{
           req.body["errormessage"] = val
           res.render('createCapabilityForm.html', req.body)  
        }
    } catch (e){
        console.log(e)
    }


})

router.post("/UpdateCapability", [auth.isAdmin], async(req,res) =>{
    try{
        console.log("res "+req.body.capabilityID)
        var capabilityID = req.body.capabilityID
        var capabilityName = req.body.capabilityName
        console.log(capabilityName)
        var capability = {capabilityID: capabilityID, capabilityName: capabilityName}
        var val = await capabilityValidator.checkCapability(capability)

        if (val == "no error"){
            var id =  await capabilityService.updateCapabilites(capability,req.cookies.access_token)
            console.log("Hello")
            res.redirect("/viewAllCapabilitiesforUpdate")
        }else{
           req.body["errormessage"] = val
           res.render('updateCapabilities.html', req.body)  
        }
    } catch (e){
        console.log(e)
    }


})

router.get("/viewAllCapabilitiesforUpdate",[auth.isAdmin],  async(req, res) => { 
    var role =  await capabilityService.getAllCapabilitesInfo(req.cookies.access_token)
    for(i = 0; i < role.length; i++){
        role[i].leadID = '<a href="http://localhost:3000/updateCapabilityInfo?capabilityID='+role[i].capabilityID+'">Update Capability</a>'
    }
    res.render('viewAllCapabilities.html', { jobroles: role })
});

router.get("/updateCapabilityInfo",[auth.isAdmin],  async(req, res) =>{
    var capInfo = await capabilityService.getCapabilityLeadInfo(req.query.capabilityID,req.cookies.access_token)
    console.log(req.query.capabilityID)
    res.render('updateCapabilities.html', {
        capabilityID: req.query.capabilityID
    })   
 
});

module.exports = router;
