const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");

//..VALIDATION FUNCTION...........................
const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true

}

//.. E-MAIL VALIDATION FUNCTION......................................
const isRightFormatEmail = function (email) {
    return /^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email)
}
// phon number validation function.................................
const isRightFormatPhone=function(phone){
    return /^[6-9]\d{9}$/.test(phone)
}

//... CREATING NEW USER....................................
const registerNewUser = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length > 0) {

            if (!isValid(data.title))
             { return res.status(400).send({ status: false, messag: "title is required" }) }
            //  if(data.title!="Mr"||data.title!="Mrs"||data.title!="Miss")
            //  {return res.status(400).send({ status: false, msg: "please enter a appropriate title" })}
            if (!isValid(data.name)) 
            { return res.status(400).send({ status: false, message: "name is required" }) }
            if (!isValid(data.phone)) 
            { return res.status(400).send({ status: false, message: "phone number required" }) }
            if(!isRightFormatPhone){
                return res.status(400).send({ status: false,messag: "please enter a valid phone number" }) 
            }

            const duplicatePhone= await userModel.findOne({phone:data.phone})
            if(duplicatePhone){
            return res.status(400).send({status:false, message:"Phone number already exist"})
            }

            if (!isValid(data.email)) 
            { return res.status(400).send({ status: false, message: "email is required" }) }
            
          if (!isRightFormatEmail(data.email))
           { return res.status(400).send({ status: false,messag: "please enter a valid email" }) }
        }
        const duplicateEmail= await userModel.findOne({email:data.email})
           if(duplicateEmail){
              return res.status(400).send({status:false, message:" e-mail already exist"})
           }
        if (!isValid(data.password)) { return res.status(400).send({ status: false, message: "password is required" }) }
        if (data.password.length < 8 || data.password.length > 15) {
            return res.status(400).send(
                { status: false, message: "Password should be of minimum 8 characters & maximum 15 characters" })
        }

        let newUser = await userModel.create(data);
        return res.status(201).send({ status: true, message: 'Success', data: newUser });
    }


    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


const loginUser = async function (req, res) {

    try {

        let body = req.body

        if (Object.keys(body) != 0) {
            let userEmail = req.body.email;
            let passwords = req.body.password;

            if (!isValid(userEmail)) { return res.status(400).send({ status: false, msg: "email is required" }) }
            if (!isRightFormatEmail(userEmail)) { return res.status(400).send({ status: false, msg: "please enter a valid email" }) }
            if (!isValid(passwords)) { return res.status(400).send({ status: false, msg: "password is required" }) }
            if (passwords.length < 8 || passwords.length > 15) {
                return res.status(400).send({ status: false, msg: "Password should be of minimum 8 characters & maximum 15 characters" })
            }

            let user = await userModel.findOne({ email: userEmail, password: passwords });

            if (!user) {
                return res.status(400).send({
                    status: false, message: "username or the password is not corerct" });
            }
               let token = jwt.sign(
                { authId: user._id,},
                 "Project-Three", { expiresIn: "30m" }

            );
            res.status(201).setHeader("x-api-key", token);
            return res.status(201).send({ status: "true", message:"Success", TOKEN: token });
      
            }
      else { return res.status(400).send({ status:"false",message: "Invalid Request" }) }
    
        }
    catch (err) {

    return res.status(500).send({ status:false,message: err.message })
}
    }



module.exports.registerNewUser = registerNewUser
module.exports.loginUser = loginUser
