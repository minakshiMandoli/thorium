const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const MiddleWare= require("../middleWare/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUsers", userController.createUser  )

router.post("/loginUser", userController.loginUser)


router.get("/getUserData/:userId",MiddleWare.mid1, userController.getUserData)

router.put("/updateUser/:userId",MiddleWare.mid1, userController.updateUser)
router.delete("/deleteUser/:userId", MiddleWare.mid1,userController.deleteUser)
router.post("/user/:userId/posts",MiddleWare.mid1,userController.postMessage)
module.exports = router;