const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel")


// const authentication=function(req,res,next){
//         let token = req.headers["x-auth-token"];
//         if(!token) return res.send({ status:false, msg:"token must be present"})
//         let decodedToken = jwt.verify(token, "Project-One")
//         if(!decodedToken) return res.send({ status: false, msg: "token is invalid"})
//         next()
//     }


    

//     const authorise = function(req, res, next) {
//         let token = req.headers["x-auth-token"];
//         let decodedToken = jwt.verify(token,  "Project-One")
//         let userToBeModified = req.params.authorId
//         let userLoggedIn = decodedToken.authorId
//         if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
//         next()
//     }
    const auth = async function (req, res, next) {
        try {
            let token = req.headers["x-auth-token"];
            if (!token) 
           { return res.status(400).send({ status: false, msg: "token must be present" })}
            let decodedToken = jwt.verify(token, "Project-One")
            if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" })}

            let id = req.params.blogId
            let blogToBeModified = await blogModel.findById(id)
            
            if(blogToBeModified)
            {
            
            let author=blogToBeModified.authorId
            
            


            let userLoggedIn = decodedToken.authId
           
            if (author != userLoggedIn)
               { return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested blog' })}
            else if(author==userLoggedIn){next()}}
            else{res.status(404).send("blog not found")}
        }
        catch (err) {
    
            return res.status(500).send({ERROR:err.message})
    
        }
    
    }



   



module.exports.auth=auth