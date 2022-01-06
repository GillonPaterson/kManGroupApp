const secret = Buffer.from("2w0lavt3CFAAqAY1z4q+LpZfCNW5gLH+udmMfi/Tl6g=", 'base64')
const jwt = require('jsonwebtoken');

const authoriser = (req, res, next, isAdmin) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.redirect("login");
    }
    try {
      const data = this.tokenVerifier(token)
      if(isAdmin && !data.isAdmin){
        return res.redirect("home")    
      }
      else{
        next()
      }
    } catch(e) {
        console.log(e)
      return res.redirect("login");
    }
  };

exports.isAuthorised = (req, res, next) => {
    authoriser(req, res, next, false)
  };

exports.isAdmin = (req, res, next) => {
    authoriser(req,res,next,true)
};

exports.tokenVerifier = (token) => {
    return jwt.verify(token, secret)
}