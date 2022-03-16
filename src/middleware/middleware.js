const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel")


    const auth = async function (req, res, next) {
        try {
            let token = req.headers["x-api-key"];
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