const jwt = require("jsonwebtoken");


const authentication=function(req,res,next){
        let token = req.headers["x-auth-token"];
        if(!token) return res.send({ status:false, msg:"token must be present"})
        let decodedToken = jwt.verify(token, "Project-One")
        if(!decodedToken) return res.send({ status: false, msg: "token is invalid"})
        next()
    }


    

    const authorise = function(req, res, next) {
        let token = req.headers["x-auth-token"];
        let decodedToken = jwt.verify(token,  "Project-One")
        let userToBeModified = req.params.authorId
        let userLoggedIn = decodedToken.authorId
        if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
        next()
    }

module.exports.authentication =authentication

module.exports.authorise =authorise