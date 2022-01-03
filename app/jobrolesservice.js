const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;

// User Story 1
exports.getJobRoles = async() => {
    try{
    const response = await axios.get('http://localhost:8080/api/getJobRoles');
    return response.data;
    }catch(e)
    {
        return;
    }
}

exports.getJobRoleSpec = async(jobRoleID) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobSpec/'+jobRoleID)
        return response.data;
    }catch(err){
        return false;
    }
}

exports.getRoleMatrix = async() => {
    const response = await axios.get('http://localhost:8080/api/getRoleMatrix')
    return response.data;
}

exports.getCompetencyData = async(jobRoleID) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobCompetency/'+jobRoleID)
        return response.data;
    }catch(e)
    {
        return;
    }


}

exports.getJobTrainingDP = async(jobBandLevel) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobTrainingDP/' + jobBandLevel)
        return response.data;
    }catch(e)
    {
        return;
    }
}

exports.getJobTrainingPS = async(jobBandLevel) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobTrainingPS/' + jobBandLevel)
        return response.data;
    }catch(e)
    {
        return;
    }
}

exports.getJobTrainingTS = async(jobBandLevel) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobTrainingTS/' + jobBandLevel)
        return response.data;
    }catch(e)
    {
        return;
    }
}