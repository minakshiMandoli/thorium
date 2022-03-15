const mongoose = require('mongoose');
const authorModel = require("../models/authorModel")

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
    let authName = req.body.emailId;
    let passwords = req.body.password;
  console.log(authName)
    let author = await authorModel.findOne({ email: authName, password: passwords });
    if (!author)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });
  
    let token = jwt.sign(
      {
        authId: author._id,
        batch: "thorium",
        organisation: "FUnctionUp",
        project:"Project-1"
      },
      "Project-One"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  };

 
 
  module.exports.loginAuthor=loginAuthor

module.exports.createAuthor= createAuthor



