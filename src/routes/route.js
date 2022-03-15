const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const mid1= require("../middleware/middleware")

router.post("/createAuthor",authorController.createAuthor)

router.post("/loginToken", authorController.loginAuthor)

router.post("/createBlog",blogController.createBlog)

router.get("/blog",mid1.authentication,mid1.authorise, blogController.getBlog)



router.put("/blogs1/:blogId",mid1.authentication,mid1.authorise, blogController.updateBlog)

router.delete("/blogs/:blogsId",mid1.authentication,mid1.authorise, blogController.deleteBlogById)
router.delete("/deleteBlogs",mid1.authentication,mid1.authorise, blogController.deletedByQueryParams)


module.exports = router;


