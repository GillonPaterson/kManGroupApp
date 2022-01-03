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
    try{
        const response = await axios.get('http://localhost:8080/api/getRoleMatrix')
        return response.data;
    }catch(err){
        return false;
    }
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

exports.getJobTraining = async(jobBandLevel) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobTraining/' + jobBandLevel)
        return response.data;
    }catch(e)
    {
        return;
    }
}

exports.getAllCapabilityLeadInfo = async() =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getCapabilityLeads')
        return response.data;
    }catch(e)
    {
        return;
    }
}