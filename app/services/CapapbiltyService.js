const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;


exports.addCapabilty= async(capabilty) =>{
    console.log(capabilty)
    try{
        const response = await axios.post('http://localhost:8080/api/createCapability',capabilty)
        console.log(response)
        return response.data;
    }catch(e)
    {
        console.log(e)
        return;
    }
}

