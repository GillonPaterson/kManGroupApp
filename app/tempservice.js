const NodeCache = require('node-cache')
const myCache = new NodeCache()
const axios = require('axios').default

exports.editJobRole = async (ID, role) => {
  try {
    console.log(role)
    const response = await axios.post('http://localhost:8080/api/editJobRole/' + ID, role)
    return response.data
  } catch (error) {
    return -1
  }
}

exports.getJobRole = async (roleID, token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/getJobRole/' + roleID, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    return -1
  }
}
