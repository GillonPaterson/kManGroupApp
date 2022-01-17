const axios = require('axios').default

exports.getJobBandLevels = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/band-level/getJobBandLevels', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}
