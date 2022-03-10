
const jwt = require("jsonwebtoken");

const mid1 = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];


    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });


    let userToBeModified = req.params.userId
    let userLoggrdIn = decodedToken.userId
    if (userToBeModified != userLoggrdIn)
      return res.send({ status: false, msg: "user not autherized" })


    next();
  }
  catch (error) {
    res.status(500).send({ msg: error.message });
  }
}


module.exports.mid1 = mid1;
