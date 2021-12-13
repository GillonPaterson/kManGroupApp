const express = require("express");
const router = express.Router();
const jobrolesservice = require("./jobrolesservice.js");


const NodeCache = require("node-cache");
const myCache = new NodeCache();


router.get("/jobroles", async(req, res) => {
    res.render('job-roles', { jobroles: await jobrolesservice.getJobRoles() });
});