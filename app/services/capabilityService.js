const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;

exports.getAllCapabilityLeadsInfo = async() =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getAllCapabilityLead')
        return response.data;
    }catch(e)
    {
        return;
    }
}

exports.getCapabilityLeadInfo = async(leadID) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getCapabilityLead/'+leadID)
        return response.data;
    }catch(e)
    {
        return;
    }
}

exports.addCapabilty= async(capabilty) =>{
    try{
        const response = await axios.post('http://localhost:8080/api/createCapability',capabilty)
        return response.data;
    }catch(e)
    {
        console.log(e)
        return;
    }
}

exports.getAllCapabilitesInfo = async(leadID) =>{
    try{
        const response = await axios.get('http://localhost:8080/api/getAllCapabilities')
        return response.data;
    }catch(e)
    {
        return;
    }
} 

exports.updateCapabilites= async(capability) =>{
    try{
        console.log(capability)
        const response = await axios.post('http://localhost:8080/api/updateCapability',capability)
        return response.data;
    }catch(e)
    {
        console.log(e)
        return;
    }
}