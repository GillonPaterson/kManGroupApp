const NodeCache = require('node-cache')
const myCache = new NodeCache()
const axios = require('axios').default

exports.getCompetencyData = async (jobRoleID, token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getJobCompetency/' + jobRoleID, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}

exports.getAllCompetencyData = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getAllCompetenciesData/', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
  }
}
