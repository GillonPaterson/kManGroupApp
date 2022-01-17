const axios = require('axios').default

exports.getAllCapabilityLeadsInfo = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/capability/getAllCapabilityLead', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e) 
  }
}

exports.getCapabilityLeadInfo = async (leadID, token) => {
  try {
    const response = await axios.get('http://localhost:8080/capability/getCapabilityLead/' + leadID, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e) 
  }
}

exports.addCapabilty = async (capabilty, token) => {
  try {
    const response = await axios.post('http://localhost:8080/capability/createCapability', capabilty, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

exports.getAllCapabilitesInfo = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/capability/getAllCapabilities', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e) 
  }
}

exports.updateCapabilites = async (capability, token) => {
  try {
    console.log(capability)
    const response = await axios.post('http://localhost:8080/capability/updateCapability', capability, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}
