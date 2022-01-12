const express = require("express");
const router = express.Router();
const jobrolesservice = require("./services/jobrolesservice.js");
const loginService = require("./services/loginService.js");
const competencyService = require("./services/competencyService")
const capabilityService = require("./services/capabilityService")

router.use('/', require('./routes/admin'))

router.get("/home", async (req, res) => {
    if (res.locals.auth.isAdmin) {
        res.render('adminHome.html')
    } else {
        res.render('home.html')
    }
});

router.get("/employeeHome", async (req, res) => {
    res.render('home.html')
});

router.get("/jobroles", async (req, res) => {
    var role = await jobrolesservice.getJobRoles(req.cookies.access_token)

    for (i = 0; i < role.length; i++) {
        role[i].jobBandLevel = "<a href=http://localhost:3000/competencyData?jobRoleID=" + role[i].jobRoleID + ">" + role[i].jobBandLevel + "</a>"
        role[i].viewSpecURL = "<a href=http://localhost:3000/jobSpec?jobRoleID=" + role[i].jobRoleID + ">More Info</a>"
        role[i].editURL = "<a href=http://localhost:3000/editRole?jobRoleID=" + role[i].jobRoleID + ">Edit</a>"
        role[i].deleteURL = "<a href=http://localhost:3000/deleteRole?jobRoleID=" + role[i].jobRoleID + ">Delete</a>"
    }
    res.render('jobroles.html', {
        jobroles: role
    })
});

router.get("/jobSpec", async (req, res) => {
    var role = await jobrolesservice.getJobRoleSpec(req.query.jobRoleID, req.cookies.access_token)
    if (role != false) {
        res.render('jobSpec.html', {
            jobRoleInfo: role
        })
    } else {
        res.render('pageNotFound.html')
    }
});

router.get("/competencyData", async (req, res) => {
    var role = await competencyService.getCompetencyData(req.query.jobRoleID, req.cookies.access_token)
    res.render('competencyInfo.html', {
        jobRoleInfo: role
    })
});

router.get("/training", async (req, res) => {
    var bandLevel = req.query.jobBandLevel
    var role = await jobrolesservice.getJobTraining(bandLevel, req.cookies.access_token)
    var roleDP = role.DPGroup
    var rolePS = role.PSGroup
    var roleTS = role.TSGroup


    for (i = 0; i < roleDP.length; i++) {
        roleDP[i].trainingLink = "<a href=" + roleDP[i].trainingLink + ">View course</a>"
    }

    for (i = 0; i < rolePS.length; i++) {
        rolePS[i].trainingLink = "<a href=" + rolePS[i].trainingLink + ">View course</a>"
    }

    for (i = 0; i < roleTS.length; i++) {
        roleTS[i].trainingLink = "<a href=" + roleTS[i].trainingLink + ">View course</a>"
    }

    res.render('training.html', {
        jobRoleInfo: bandLevel,
        DPtrainingcourses: roleDP,
        PStrainingcourses: rolePS,
        TStrainingcourses: roleTS
    })
});


router.get("/roleMatrix", async (req, res) => {
    var roleMatrix = await jobrolesservice.getRoleMatrix(req.cookies.access_token)
    res.render('roleMatrix.html', {
        rows: roleMatrix.rows,
        headers: roleMatrix.headers
    })
});

router.get("/jobFamilies", async (req, res) => {
    var jobFamilies = await jobrolesservice.getJobFamilies(req.cookies.access_token)
    res.render('jobFamilies.html', {
        rows: jobFamilies,
        object: "hi",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Emblem-extra-cool.svg/1200px-Emblem-extra-cool.svg.png"
    })
});



router.get("/viewAllCapabilities", async (req, res) => {
    var role = await capabilityService.getAllCapabilityLeadsInfo(req.cookies.access_token)
    for (i = 0; i < role.length; i++) {
        role[i].leadID = '<a href="http://localhost:3000/capabilityLeadInfo?leadID=' + role[i].leadID + '">More Info</a>'
    }
    res.render('viewAllCapabilityLeads.html', {
        jobroles: role
    })
});

router.get("/capabilityLeadInfo", async (req, res) => {
    var capInfo = await capabilityService.getCapabilityLeadInfo(req.query.leadID, req.cookies.access_token)
    res.render('viewCapabilityLead.html', {
        rows: capInfo
    })

});

router.get("/login", async (req, res) => {
    res.render('login.html')
})

router.post("/login", async (req, res) => {
    var response = await loginService.login(req.body)
    if (!response) {
        res.render("login", {
            errormessage: "Login Failed"
        })
    } else {
        return res
            .cookie("access_token", response, {
                httpOnly: true,
            })
            .status(200)
            .redirect("home")
    }
})

router.get("/logout", (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .render("logout.html");
});

router.all("*", async (req, res) => {
    res.redirect('home')
});

module.exports = router;