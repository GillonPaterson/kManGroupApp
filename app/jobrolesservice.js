const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;

// User Story 1
exports.getJobRoles = async(token) => {
    try{
        const response = await axios.get('http://localhost:8080/api/getJobRoles',{headers: {'Authorization': "Bearer " + token}});
        return response.data;
    }catch(e)
    {
        return;
    }
}


exports.addJobRole = async(role,token) => {
    try {
        const response = await axios.post('http://localhost:8080/api/addJobRole', role, {headers: {'Authorization': "Bearer " + token}});
        return response.data
    } catch (error) {
        return -1;
    }
}


exports.getJobRoleSpec = async(jobRoleID,token) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobSpec/'+jobRoleID,{headers: {'Authorization': "Bearer " + token}})
        return response.data;
    }catch(err){
        return false;
    }
}

exports.getJobBandLevels = async(token) => {
    try{
    const response = await axios.get('http://localhost:8080/api/getJobBandLevels',{headers: {'Authorization': "Bearer " + token}});
    return response.data;
    }catch(e)
    {
        return;
    }
}

exports.getJobFamilyNames = async(token) => {
    try{
    const response = await axios.get('http://localhost:8080/api/getJobFamilyNames',{headers: {'Authorization': "Bearer " + token}});
    return response.data;
    }catch(e)
    {
        return;
    }
}


exports.getRoleMatrix = async(token) => {
    try{
        const response = await axios.get('http://localhost:8080/api/getRoleMatrix',{headers: {'Authorization': "Bearer " + token}})
        let rows = []
        let headers = []
        
        headers.push("Band Level")

        response.data.capability.forEach(capability => {
            headers.push(capability)
        });

        response.data.bandLevel.forEach(bandLevel => {
            let row = []
            row.push(bandLevel)
            
            for(let col = 1; col < headers.length; col ++){
                let roles = []
                response.data.roleMatrixModel.forEach(role => {
                    if(role.bandLevel == row[0] && role.capability == headers[col]){
                        roles.push('<a href="http://localhost:3000/jobSpec?jobRoleID='+role.jobRoleID+'">' + role.jobRole +"</a>")
                    }
                })
                row.push(roles.join(", "))
            }

            rows.push(row)
        });

        let roleMatrix = {headers: headers, rows: rows};

        return roleMatrix;
    }catch(err){
        return false;
    }
}

exports.getCompetencyData = async(jobRoleID,token) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobCompetency/'+jobRoleID,{headers: {'Authorization': "Bearer " + token}})
        return response.data;
    }catch(e)
    {
        return;
    }


}


exports.getJobTraining = async(jobBandLevel,token) =>{

    try{
        const response = await axios.get('http://localhost:8080/api/getJobTraining/' + jobBandLevel,{headers: {'Authorization': "Bearer " + token}})
        var coursesDP = [];
        var coursesPS = [];
        var coursesTS = [];

        for(let i = 0; i < response.data.length; i++)
        {
            if(response.data[i].trainingGroup == "Development programmes")
                coursesDP.push(response.data[i]);

                if(response.data[i].trainingGroup == "Professional skills")
                coursesPS.push(response.data[i]);

                if(response.data[i].trainingGroup == "Technical skills")
                coursesTS.push(response.data[i]);
        }

        var coursegroups = {DPGroup: coursesDP, PSGroup: coursesPS, TSGroup: coursesTS};
        return coursegroups;
    }catch(e)
    {
        return;
    }
}


exports.getAllCapabilityLeadsInfo = async(token) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getAllCapabilityLead',{headers: {'Authorization': "Bearer " + token}})
        return response.data;
    }catch(e)
    {
        return;
    }
}

exports.getJobFamilies = async(token) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobFamilies/',{headers: {'Authorization': "Bearer " + token}})

        let rows = []
        response.data.forEach(capability =>{
            let row = []
            row.push(capability.jobCapability)

            capability.jobFamily.forEach(jobFamily =>{
                row.push(jobFamily)
            })
            rows.push(row)
        })

        return rows;
    }catch(e)
    {
        return false;
    }
}

exports.getCapabilityLeadInfo = async(leadID,token) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getCapabilityLead/'+leadID,{headers: {'Authorization': "Bearer " + token}})
        return response.data;
    }catch(e)
    {
        return;
    }
}

exports.addCapabilty= async(capabilty,token) =>{
    try{
        const response = await axios.post('http://localhost:8080/api/createCapability',capabilty,{headers: {'Authorization': "Bearer " + token}})
        return response.data;
    }catch(e)
    {
        console.log(e)
        return;
    }
}


exports.getAllCapabilitesInfo = async(leadID,token) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getAllCapabilities',{headers: {'Authorization': "Bearer " + token}})
        return response.data;
    }catch(e)
    {
        return;
    }
}   



exports.updateCapabilites= async(capability,token) =>{
    try{
        console.log(capability)
        const response = await axios.post('http://localhost:8080/api/updateCapability',capability,{headers: {'Authorization': "Bearer " + token}})
        return response.data;
    }catch(e)
    {
        console.log(e)
        return;
    }
}

