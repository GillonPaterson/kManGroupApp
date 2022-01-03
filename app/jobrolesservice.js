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

