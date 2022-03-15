const mongoose = require('mongoose');
const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel");
const { findOneAndUpdate } = require('../models/blogModel');
//const ObjectId = mongoose.Schema.Types.ObjectId

const createBlog =async function(req,res){
try{    let data = req.body;
    let author = await authorModel.find({_id: data.authorId})
    if(author){

    let savedData = await blogModel.create(data);
    res.status(201).send({ msg: savedData }); 
}
else{
    res.status(400).send("Author does not exist")
}
}catch(error){
    res.status(500).send(error.message)
}}




const getBlog =async function(req,res){
    const data = req.query
        const filter = {
        isDeleted:false,
        isPublished:true,
            ...data
    }


    const blog = await blogModel.find( filter )
    if(blog.length == 0){
        return res.status(400).send({status: false,msg: "no blogs published"})
    }
    return res.status(200).send({status:true,data:blog})
    }




// update



const updateBlog = async function (req, res) {

    let blogId = req.params.blogId
      
    let data=req.body
   
    let x = await blogModel.findById(blogId)
        console.log(x);
    try {
      if (x) {
        if (x.isDeleted === false) {

            if (data.isPublished===true){
                let a =await blogModel.findOneAndUpdate({_id: blogId},{$set:{isPublished:true, publishedAt:Date.now()}})
            }
            
          let updatedBlog = await blogModel.findOneAndUpdate({ _id:  blogId  }, {...data}, { new: true })

         return res.status(200).send({ msg: "blog updated successfully", updatedBlog })
  
        }
        else {
          return res.status(404).send({ msg: "blog not found" })
        }
      }
      else {
        return res.status(404).send({ msg: "blog id not found" })
      }
    }
    catch (err) {
      return res.status(500).send({ ERROR: err.message })
    }
  
  }


// delete by id 

let deleteBlogById = async function(req,res){

try{
        let id =req.params.blogsId
        console.log(id)
    if(id){
        let deletedBlog = await blogModel.findOneAndUpdate({_id : id},{$set:{isDeleted:true}})
     console.log(deletedBlog)
     res.send(deletedBlog)
    }else res.status(400).send('BAD REQUEST')
}catch(err){
    res.status(500).send({msg:ERROR, error:err.message})
}
}

    
    
    
    //delete by query params
    
    let deletedByQueryParams = async function(req,res){
        try{
          let data=req.query
       
           if(data){
             
               
          
           let deletedBlogsFinal = await blogModel.updateMany({$and:[data]},{$set:{isDeleted:true}})
       
       
          res.status(200).send({status:true})}
            
        
        else { res.status(400).send({ERROR:"BAD REQUEST"})}
       
       }
        catch(err){res.status(500).send({ERROR:err.message})}
       }
    

module.exports.createBlog= createBlog


module.exports.getBlog = getBlog

module.exports.updateBlog = updateBlog
module.exports.deleteBlogById=deleteBlogById
module.exports.deletedByQueryParams= deletedByQueryParams