const NodeCache = require('node-cache')
const myCache = new NodeCache()
const axios = require('axios').default

exports.getJobBandLevels = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getJobBandLevels', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}

exports.getJobBandLevelsAndImportance = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getJobBandLevelsAndImportance', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}

exports.createBandLevel = async (bandLevelInfo, token) => {
  try {
    const response = await axios.post('http://localhost:8080/api/createBandLevel', bandLevelInfo, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}
