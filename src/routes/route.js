const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const mid1 = require("../middleware/middleware")


router.post("/authors", authorController.createAuthor)

router.post("/login", authorController.loginAuthor)

router.post("/blogs", mid1.auth, blogController.createBlog)

router.get("/blogs", mid1.auth, blogController.getBlog)

router.put("/blogs/:blogId", mid1.auth, blogController.updateBlog)

router.delete("/blogs/:blogId", mid1.auth, blogController.deleteBlogById)

router.delete("/blogs", mid1.auth, blogController.deletedByQueryParams)


module.exports = router;