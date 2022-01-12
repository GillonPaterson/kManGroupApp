const axios = require('axios').default
const auth = require('./authoriser.js')

exports.login = async (loginInfo) => {
  try {
    const response = await axios.post('http://localhost:8080/api/login', loginInfo)
    var token = response.headers.authorization.split(' ')[1]
    auth.tokenVerifier(token)

    return token
  } catch (e) {
    console.log(e)
    return false
  }
}

exports.createUser = async (userInfo) => {
  try {
    const response = await axios.post('http://localhost:8080/api/createUser', userInfo)
    return response
  } catch (e) {
    return false
  }
}
