const express = require("express");
const router = express.Router();
const jobrolesservice = require("./jobrolesservice.js");


const NodeCache = require("node-cache");
const myCache = new NodeCache();


router.get("/jobroles", async(req, res) => { var role =  await jobrolesservice.getJobRoles()
    console.log(role)
    res.render('jobroles.html', { jobroles: role });
});

module.exports = router;