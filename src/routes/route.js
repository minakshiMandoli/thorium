const express = require('express');
const router = express.Router();


const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const mid1 = require("../middleware/middleware")

router.post("/createAuthor", authorController.createAuthor)

router.post("/loginToken", authorController.loginAuthor)

router.post("/createBlog", blogController.createBlog)

router.get("/blog",  blogController.getBlog)



router.put("/blogs1/:blogId", mid1.auth, blogController.updateBlog)

router.delete("/blogs/:blogId", mid1.auth, blogController.deleteBlogById)
router.delete("/deleteBlogs",  blogController.deletedByQueryParams)


module.exports = router;


