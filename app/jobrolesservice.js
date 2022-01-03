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
        console.log(response.data.roleMatrixModel)
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
                        roles.push('<a href="http://localhost:3000/jobSpec?jobRoleID="'+role.jobRoleID +">" + role.jobRole +"</a>")
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