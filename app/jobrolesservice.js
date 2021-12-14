const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;

// User Story 1
exports.getJobRoles = async() => {
    const response = await axios.get('http://localhost:8080/api/getJobRoles');
    return response.data;
}

exports.getJobRoleSpec = async(jobRoleID) =>{
    const response = await axios.get('http://localhost:8080/api/getJobSpec/'+jobRoleID)
    return response.data;
}