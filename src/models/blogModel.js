const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.types.ObjectId

const blogSchema = new mongoose.Schema({

    title: {
        required: true
    },
    body: { 
        type:String,
        required: true 
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "authorModel"
    },
    tags: {type:[]},
    category: {
        type: [],
        required: true,
       // enum: ["technology", "entertainment", " lifestyle", "food", "fashion"]
    },
    subcategory: {
        type: [],
     //   enum:  ["web development", "mobile development", "AI", "ML"]
    },
    isDeleted: {
        type: boolean,
        default: false
    },
    isPublished: {
        type: boolean,
         default: false
         }

}, { timestamps: true })

module.exports = mongoose.model('blogModel', blogSchema)