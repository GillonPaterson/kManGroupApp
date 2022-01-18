const axios = require('axios').default

exports.getCompetencyData = async (jobRoleID, token) => {
  try {
    const response = await axios.get('http://localhost:8080/competency/getJobCompetency/' + jobRoleID, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}
