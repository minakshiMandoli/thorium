const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {

  try {

    let data = req.body;

    if (data) {

      let savedData = await authorModel.create(data);
      return res.status(201).send({ msg: savedData });

    }

    else {return res.status(400).send("BAD REQUEST") }

  }catch (err){

    return res.status(500).send({ ERROR: err.message })

  }}

//Phase2
const loginAuthor = async function (req, res) {

  try {

    let body = req.body

    if (body) {
      let authName = req.body.email;
      let passwords = req.body.password;

      let author = await authorModel.findOne({ email: authName, password: passwords });

      if (!author) {

        return res.status(400).send({
          status: false,
          ERROR: "username or the password is not corerct",
        });
      }

      let token = jwt.sign(
        {
          authId: author._id,
          batch: "thorium",
          organisation: "FUnctionUp",
          project: "Project-1"
        }, "Project-One", { expiresIn: "1h" }

      );
      res.status(200).setHeader("x-api-key", token);
      return res.status(201).send({ status:"loggedIn", TOKEN: token });
    }

    else {return res.status(400).send({ERROR:"Bad Request"}) }

  }
  catch (err) {
    
    return res.status(500).send({ ERROR:err.message }) }

};


module.exports.loginAuthor = loginAuthor

module.exports.createAuthor = createAuthor



