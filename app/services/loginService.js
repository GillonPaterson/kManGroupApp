const axios = require('axios').default
const auth = require('../../lib/middleware/authentication/authoriser.js')

exports.login = async (loginInfo) => {
  try {
    const response = await axios.post('http://localhost:8080/api/login', loginInfo)
    var token = response.headers.authorization.split(' ')[1]

    if (token == null) {
      return false
    } else {
      const secret = Buffer.from('2w0lavt3CFAAqAY1z4q+LpZfCNW5gLH+udmMfi/Tl6g=', 'base64')
      const jwt = require('jsonwebtoken')
      jwt.verify(token, secret)

      return token
    }
  } catch (e) {
    // console.log(e)
    return false
  }
}

exports.createUser = async (userInfo, token) => {
  try {
    if (userInfo.roles == '_unchecked') {
      userInfo.roles = "['']"
    }
    const response = await axios.post('http://localhost:8080/api/createUser', userInfo, { headers: { Authorization: 'Bearer ' + token } })
    return response
  } catch (e) {
    return false
  }
}
