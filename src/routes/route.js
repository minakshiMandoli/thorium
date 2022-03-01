

// const express = require('express');
// const router = express.Router();
// const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

// module.exports = router;


const express = require('express');
const router = express.Router();
const BookModel= require("../models/bookModel.js")
const BookController= require("../controllers/bookController")


router.post("/createBook", BookController.createBook  )
router.get("/bookList", BookController.bookList )
//router.get("/getBooksData", BookController.getBooksData)
router.post("/getBooksInYear", BookController.getBooksInYear  )
router.get("/getXINRBooks", BookController.getXINRBooks  )
router.get("/getPerticularBooks", BookController.getPerticularBooks  )
router.get("/getRandomBooks", BookController.getRandomBooks  )


module.exports = router;








