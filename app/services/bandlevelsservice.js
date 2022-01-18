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
<<<<<<< HEAD
    const response = await axios.post('http://localhost:8080/api/createBandLevel', bandLevelInfo, { headers: { Authorization: 'Bearer ' + token } })
=======
    const response = await axios.post('http://localhost:8080/band-level/createBandLevel', bandLevelInfo, { headers: { Authorization: 'Bearer ' + token } })
>>>>>>> 8b63808ee3f6340504a0acef339a5ebd19fbc81c
    return response.data
  } catch (e) {
    console.log(e)
  }
}
