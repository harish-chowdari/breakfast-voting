const jwt = require("jsonwebtoken")

module.exports = function(req,res, next) {
    try {
        let token = req.header("auth-token")
        if(!token){
            return res.json("not authenticated")
        } 
        
        let decode = jwt.verify(token, "jwtSecret")
        req.user=decode.user
        next()
    }
    catch(err) {
        console.log(err)
        return res.json("not valid token")
    }
}
