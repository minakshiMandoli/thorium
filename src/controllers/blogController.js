
const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

const createBlog = async function (req, res) {
  try {
    let data = req.body;

    if (data) {


      let author = await authorModel.find({ _id: data.authorId })
      if (author.length != 0) {

        let savedData = await blogModel.create(data);
        console.log(savedData._id)

        if (data.isPublished === true) {

          let x = await blogModel.findOneAndUpdate({ _id: savedData._id },
            { $set: { publishedAt: Date.now() } }, { new: true })
          return res.status(201).send({ msg: x })
        }



        res.status(201).send({ msg: savedData });

      }

      else {
        res.status(404).send("Author does not exist")
      }
    }

    else { res.status(400).send("BAD REQUEST") }
  } catch (err) {
    res.status(500).send({ ERROR: err.message })
  }
}




const getBlog = async function (req, res) {
  const data = req.query
  const filter = {
    isDeleted: false,
    isPublished: true,
    ...data
  }


  const blog = await blogModel.find(filter)
  if (blog.length === 0) {
    return res.status(404).send({ status: false, msg: "no blogs found" })
  }
  return res.status(200).send({ status: true, data: blog })
}




// update



const updateBlog = async function (req, res) {

  let blogId = req.params.blogId

  let data = req.body


  let x = await blogModel.findById(blogId)

  try {

    if (Object.keys(data) != 0) {
      if (x) {
        if (x.isDeleted === false) {

          if (data.isPublished === true) {
            let a = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isPublished: true, publishedAt: Date.now() } })
          }

          let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { ...data }, { new: true })

          return res.status(202).send({ msg: "blog updated successfully", updatedBlog })

        }
        else {
          return res.status(404).send({ msg: "blog not found" })
        }
      }
      else {
        return res.status(404).send({ msg: "Bad Request" })
      }


    } else { res.status(400).send({ ERROR: "Bad Request" }) }
  }
  catch (err) {
    return res.status(500).send({ ERROR: err.message })
  }

}


// delete by id 

let deleteBlogById = async function (req, res) {

  try {
    let id = req.params.blogId
    console.log(id)

    if (id) {
      let deletedBlog = await blogModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true, deletedAt: Date.now() } })


      res.status(200).send({ status: "deleted" })
    } else res.status(400).send('BAD REQUEST')
  } catch (err) {
    res.status(500).send({ msg: ERROR, error: err.message })
  }
}




//delete by query params

let deletedByQueryParams = async function (req, res) {
  try {

    let token = req.headers["x-auth-token"]

    if (token) {
      let decodedToken = jwt.verify(token, "Project-One")

      if (decodedToken) {
        let data = req.query

        if (Object.keys(data) != 0) {

          let blogsToBeDeleted = await blogModel.find(data).select({ authorId: 1, _id: 0 })

          let btbd = blogsToBeDeleted.filter(ele => ele.authorId == decodedToken.authId)




          let deletedBlogsFinal = await blogModel.updateMany({ $in: btbd }, { $set: { isDeleted: true, deletedAt: Date.now() } })

          if (deletedBlogsFinal.modifiedCount === 0) { return res.status(404).send({ ERROR: "No such blog found" }) }


          return res.status(200).send({ status: "deleted" })
        }


        else { res.status(400).send({ ERROR: "BAD REQUEST" }) }

      } else { res.status(401).send({ ERROR: "Invalid Token" }) }


    }
    else { res.status(400).send({ ERROR: "Please provide Token" }) }


  }



  catch (err) { res.status(500).send({ ERROR: err.message }) }
}


module.exports.createBlog = createBlog


module.exports.getBlog = getBlog

module.exports.updateBlog = updateBlog
module.exports.deleteBlogById = deleteBlogById
module.exports.deletedByQueryParams = deletedByQueryParams


