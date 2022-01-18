const axios = require('axios').default

exports.getTraining = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getTraining/', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    console.log(e)
  }
}
