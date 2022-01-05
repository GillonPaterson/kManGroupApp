const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;

exports.getCapabilityLeadInfo = async(leadID) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getCapabilityLead/'+leadID)
        console.log(response.data)
        return response.data;
    }catch(e)
    {
        return;
    }
}

exports.getAllCapabilityLeadsInfo = async() =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getAllCapabilityLead')
        return response.data;
    }catch(e)
    {
        return;
    }
}

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

