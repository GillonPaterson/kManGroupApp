const axios = require('axios').default
const querystring = require('querystring')

// User Story 1
exports.getJobRoles = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/job-roles/getJobRoles', { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}

exports.getJobRolesFilter = async (token, roledata) => {
  try {
    
    if(roledata.capability === '_unchecked')
    {
      roledata.capability = []
    }

    if(roledata.family === '_unchecked')
    {
      roledata.family = []
    }

    if(roledata.bandlevel === '_unchecked')
    {
      roledata.bandlevel = []
    }

    if(roledata.jobrolename === '')
    {
      roledata.jobrolename = null;
    }

    let queryString = querystring.stringify(roledata);

    console.log(queryString)
    const response = await axios.get('http://localhost:8080/api/getJobRolesFilter?' + queryString, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {

  }
}

exports.addJobRole = async (role, token) => {
  try {
    const response = await axios.post('http://localhost:8080/job-roles/addJobRole', role, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (error) {
    return -1
  }
}

exports.deleteJobRole = async (id, token) => {
  try {
    const response = await axios.post('http://localhost:8080/job-roles/deleteJobRole/' + id, {}, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (error) {
    return -1
  }
}

exports.getJobRoleSpec = async (jobRoleID, token) => {
  try {
    const response = await axios.get('http://localhost:8080/job-roles/getJobSpec/' + jobRoleID, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (err) {
    return false
  }
}

exports.getRoleMatrix = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/job-roles/getRoleMatrix', { headers: { Authorization: 'Bearer ' + token } })
    const rows = []
    const headers = []

    headers.push('Band Level')

    response.data.capability.forEach(capability => {
      headers.push(capability)
    })

    response.data.bandLevel.forEach(bandLevel => {
      const row = []
      row.push(bandLevel)

      for (let col = 1; col < headers.length; col++) {
        const roles = []
        response.data.roleMatrixModel.forEach(role => {
          if (role.bandLevel === row[0] && role.capability === headers[col]) {
            roles.push('<a href="http://localhost:3000/jobSpec?jobRoleID=' + role.jobRoleID + '">' + role.jobRole + '</a>')
          }
        })
        row.push(roles.join(', '))
      }

      rows.push(row)
    })

    const roleMatrix = { headers: headers, rows: rows }

    return roleMatrix
  } catch (err) {
    return false
  }
}

exports.editJobRole = async (ID, role, token) => {
  try {
    const response = await axios.post('http://localhost:8080/job-roles/editJobRole/' + ID, role, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (error) {
    return -1
  }
}

exports.getJobRole = async (roleID, token) => {
  try {
    const response = await axios.get('http://localhost:8080/job-roles/getJobRole/' + roleID, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
  } catch (e) {
    return -1
  }
}
