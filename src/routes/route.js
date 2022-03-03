const express = require('express');
const router = express.Router();


const AllController= require("../controllers/allController")




router.post("/createAuthor", AllController.createAuthor  )
router.post("/createPublisher", AllController.createPublisher  )
router.post("/createBook", AllController.createBook  )
router.get("/getBooksWithAuthorDetails",AllController.getBooksWithAuthorDetails)

// router.get("/getAuthorsData", authorController.getAuthorsData)

// router.post("/createBook", bookController.createBook  )

// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)





module.exports = router;