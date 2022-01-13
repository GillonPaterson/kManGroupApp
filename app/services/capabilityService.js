const NodeCache = require('node-cache')
const myCache = new NodeCache()
const axios = require('axios').default

exports.getAllCapabilityLeadsInfo = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getAllCapabilityLead', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}

exports.getCapabilityLeadInfo = async (leadID, token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getCapabilityLead/' + leadID, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}

exports.addCapabilty = async (capabilty, token) => {
  try {
    const response = await axios.post('http://localhost:8080/api/createCapability', capabilty, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

exports.getAllCapabilitesInfo = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getAllCapabilities', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}

exports.updateCapabilites = async (capability, token) => {
  try {
    console.log(capability)
    const response = await axios.post('http://localhost:8080/api/updateCapability', capability, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}
