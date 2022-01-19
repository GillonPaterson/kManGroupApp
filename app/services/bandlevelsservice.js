const axios = require('axios').default

exports.getJobBandLevels = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/band-level/getJobBandLevels', { headers: { Authorization: 'Bearer ' + token } })
    console.log(response)
    return response.data
  } catch (e) {
    var error = e.name + ': ' + e.message
    console.error(error)
    return null
  }
}

exports.getJobBandLevelsAndImportance = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/band-level/getJobBandLevelsAndImportance', { headers: { Authorization: 'Bearer ' + token } })
    console.log(response)
    return response.data
  } catch (e) {
    var error = e.name + ': ' + e.message
    console.error(error)
    return null
  }
}

exports.createBandLevel = async (bandLevelInfo, token) => {
  try {
    await axios.post('http://localhost:8080/band-level/createBandLevel', bandLevelInfo, { headers: { Authorization: 'Bearer ' + token } })
  } catch (e) {
    var error = e.name + ': ' + e.message
    console.error(error)
    return false
  }
}
