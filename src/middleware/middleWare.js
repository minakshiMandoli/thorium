const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");

    const authentication = async function(req,res,next){

        try{
        let token = req.headers["x-api-key"]
        if(!token){
            // let decodedToken = jwt.verify(token , "Project-Three" )      
            // if(decodedToken){  
            // next()
            // }
            // else {return res.status(403).send({status:false, message:"Authorization Token is Invalid"})}

       // }else{ 
           return res.status(403).send({ERROR:"Authorization Token Missing"})} 
            next()
    }catch(err){
    return res.status(500).send({ERROR:err.message})}
}

   const authorization=async function(req,res,next){
try{
    let token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token , "Project-Three" )   
     let bookId= req.params.bookId

   if(bookId){
    let bookFound= await bookModel.findById(bookId)
    userId=bookFound.userId
  // console.log(userId.toString())
   //console.log(decodedToken.authId)
    if(userId!=decodedToken.authId){
    //console.log(decodedToken.authId)
    return res.status(403).send({status:false, message:"user not authorised"})
    }
   }
   else{
       let userId= req.body.userId
       if(userId!=decodedToken.authId){
        return res.status(403).send({status:false, message:"user not authorised to perform task"})
        }
   }
next()
}
catch(err){
   return res.status(500).send({ERROR:err.message})
}
   }

module.exports.authentication=authentication
module.exports.authorization=authorization