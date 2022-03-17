const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {

  try {

    let data = req.body;
    // console.log(data)
    if (data) {
      let pw = data.password
      // console.log(pw)
      let eM = data.email
      // console.log(eM)
      if (eM && pw) {

        if (/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(eM)) {

          if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(pw)) {

            let savedData = await authorModel.create(data);
            return res.status(201).send({ Data: savedData });

          } else {
            return res.status(400).send("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
          }
        } else {
          return res.status(400).send("not a valid email")
        }
      } else {
        return res.status(400).send("email or password is empty")
      }

    }

    else { return res.status(400).send("BAD REQUEST") }

  } catch (err) {

    return res.status(500).send({ ERROR: err.message })

  }
}

//Phase2
const loginAuthor = async function (req, res) {

  try {

    let body = req.body

    if (body) {
      let authName = req.body.email;
      if (/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(authName)) {
        let passwords = req.body.password;
        if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(passwords)) {


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
          return res.status(201).send({ status: "loggedIn", TOKEN: token });

        } else {
          return res.status(400).send("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
        }
      } else {
        return res.status(400).send("not a valid email")
      }
    }

    else { return res.status(400).send({ ERROR: "Bad Request" }) }

  }
  catch (err) {

    return res.status(500).send({ ERROR: err.message })
  }

};


module.exports.loginAuthor = loginAuthor

module.exports.createAuthor = createAuthor



