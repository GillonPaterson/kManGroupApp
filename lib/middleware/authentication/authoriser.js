module.exports = function (req, res, next) {
  // all paths not secured
  const nonSecurePaths = ['/login', '/govuk', '/public']
  if (nonSecurePaths.filter(s => req.path.includes(s)).length > 0) {
    return next()
  }

  const secret = Buffer.from('2w0lavt3CFAAqAY1z4q+LpZfCNW5gLH+udmMfi/Tl6g=', 'base64')
  const jwt = require('jsonwebtoken')
  const token = req.cookies.access_token
  if (!token) {
    return res.status(403).redirect('login')
  } else {
    try {
      const data = jwt.verify(token, secret)
      res.locals.auth = {
        username: data.username,
        isAdmin: data.isAdmin
      }
      next()
    } catch (e) {
      console.log('error while parsing cookie (Handled): ' + e)
      return res.status(401).redirect('login')
    }
  }
}
