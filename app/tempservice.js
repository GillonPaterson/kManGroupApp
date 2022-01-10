const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;

exports.getJobRole = async(roleID) => {
    try{
    const response = await axios.get('http://localhost:8080/api/getJobRole/' + roleID);
    return response.data;
    }catch(e)
    {
        return;
    }
}