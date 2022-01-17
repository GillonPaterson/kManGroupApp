const axios = require('axios').default

exports.getJobTraining = async (jobBandLevel, token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/getJobTraining/' + jobBandLevel, { headers: { Authorization: 'Bearer ' + token } })
      var coursesDP = []
      var coursesPS = []
      var coursesTS = []
  
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].trainingGroup == 'Development programmes') { coursesDP.push(response.data[i]) }
  
        if (response.data[i].trainingGroup == 'Professional skills') { coursesPS.push(response.data[i]) }
  
        if (response.data[i].trainingGroup == 'Technical skills') { coursesTS.push(response.data[i]) }
      }
  
      var coursegroups = { DPGroup: coursesDP, PSGroup: coursesPS, TSGroup: coursesTS }
      return coursegroups
    } catch (e) {
  
    }
  }