const axios = require('axios').default

exports.getJobFamilies = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/getJobFamilies/', { headers: { Authorization: 'Bearer ' + token } })
  
      const rows = []
      response.data.forEach(capability => {
        const row = []
        row.push(capability.jobCapability)
  
        capability.jobFamily.forEach(jobFamily => {
          row.push(jobFamily)
        })
        rows.push(row)
      })
  
      return rows
    } catch (e) {
      return false
    }
  }


exports.getJobFamilyNames = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/getJobFamilyNames', { headers: { Authorization: 'Bearer ' + token } })
      return response.data
    } catch (e) {
  
    }
  }