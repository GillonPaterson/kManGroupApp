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

exports.getJobTrainingDP = async(jobBandLevel) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobTraining/' + jobBandLevel)

        var courses = [];

        for(let i = 0; i < response.data.length; i++)
        {
            if(response.data[i].trainingGroup == "Development programmes")
                courses.push(response.data[i]);
        }

        return courses;
    }catch(e)
    {
        return;
    }
}


exports.getJobTrainingPS = async(jobBandLevel) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobTraining/' + jobBandLevel)

        var courses = [];

        for(let i = 0; i < response.data.length; i++)
        {
            if(response.data[i].trainingGroup == "Professional skills")
                courses.push(response.data[i]);
        }

        return courses;
    }catch(e)
    {
        return;
    }
}

exports.getJobTrainingTS = async(jobBandLevel) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getJobTraining/' + jobBandLevel)

        var courses = [];

        for(let i = 0; i < response.data.length; i++)
        {
            if(response.data[i].trainingGroup == "Technical skills")
                courses.push(response.data[i]);
        }

        return courses;
    }catch(e)
    {
        return;
    }
}
