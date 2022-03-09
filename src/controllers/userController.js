const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req,res) {
  let data = req.body;
  let registerUser = await userModel.create(data);
  
res.send({ msg: registerUser });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });
  

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
 let token = jwt.sign(
     {
       userId: user._id.toString(),
       //batch: "thorium",      
        //organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
 };

const getUserData = async function (req, res) {

  // // If a token is present then decode the token with verify function
  // // verify takes two inputs:
  // // Input 1 is the token to be decoded
  // // Input 2 is the same secret with which the token was generated
  // // Check the value of the decoded token yourself
  //  let decodedToken = jwt.verify(token, "functionup-thorium");
  //  if (!decodedToken)
  // return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};



const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
  res.send({ status: updatedUser, data: updatedUser });
};

 const deleteUser= async function (req, res) {
  
  let userId = req.params.userId
let deletedUser=await userModel.findByIdAndUpdate( {_id:userId}, {isDeleted:"true"});
res.send({status:deletedUser});

}

const postMessage = async function (req, res) {
  let message=req.body.message
  let userId = req.params.userId;
 let user= await userModel.findById(userId)
 if (!user) {
  return res.send("No such user exists");
} 
let updatedPost=user.post
updatedPost.push(message);
let updatedUser=await userModel.findByIdAndUpdate({_id:userId},{post:updatedPost},{new:true})
res.send({status:true, data:updatedUser})
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser= deleteUser;
module.exports.postMessage=postMessage;