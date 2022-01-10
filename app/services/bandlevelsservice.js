const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;

exports.getJobBandLevels = async() => {
    try{
    const response = await axios.get('http://localhost:8080/api/getJobBandLevels');
    return response.data;
    }catch(e)
    {
        return;
    }
}