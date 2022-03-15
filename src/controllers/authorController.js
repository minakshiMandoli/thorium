
const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");

const createAuthor =async function(req,res){
try{   
    let data = req.body;
   if(data){
   
    let savedData = await authorModel.create(data);
    res.status(201).send({ msg: savedData }); 
   }
    else{res.status(400).send("BAD REQUEST")}
}
catch(err){ res.status(500).send({ERROR:err.message})
    
}}

//Phase2
const loginAuthor = async function (req, res) {
   try{ 
       let body= req.body
       
    if(body){
    let authName = req.body.emailId;
    let passwords = req.body.password;
  
    let author = await authorModel.findOne({ email: authName, password: passwords });
    if (!author){
      return res.status(400).send({
        status: false,
        msg: "username or the password is not corerct",
      });}
  
    let token = jwt.sign(
      {
        authId: author._id,
        batch: "thorium",
        organisation: "FUnctionUp",
        project:"Project-1"
      },
      "Project-One"
    );
    res.status(201).setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  }
  else{res.status(400).send}

}
  catch (err){res.status(500).send({ERROR:err.message})}


}
  ;

 
 
  module.exports.loginAuthor=loginAuthor

module.exports.createAuthor= createAuthor



