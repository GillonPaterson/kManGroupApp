module.exports  = (req, res, next) =>{
    const credentials = res.locals.auth
    if(credentials == null){
        return res.status(403).redirect("login")
    }
    else{
        if(credentials.isAdmin){
            return next()
        }
        else{
            return res.status(401).redirect("home")
        }
    }
}