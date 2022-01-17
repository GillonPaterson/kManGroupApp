const axios = require('axios').default

exports.getJobBandLevels = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/band-level/getJobBandLevels', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

exports.getJobBandLevelsAndImportance = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/band-level/getJobBandLevelsAndImportance', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

exports.createBandLevel = async (bandLevelInfo, token) => {
  try {
    const response = await axios.post('http://localhost:8080/band-level/createBandLevel', bandLevelInfo, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}
