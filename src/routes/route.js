const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')

router.post("/createAuthor",authorController.createAuthor)
router.post("/createBlog",blogController.createBlog)

router.get("/blog", blogController.getBlog)

router.put("/blogs1/:blogId", blogController.updateBlog)

router.delete("/blogs/:blogsId", blogController.deleteBlogById)
router.delete("/deleteBlogs", blogController.deletedByQueryParams)


module.exports = router;