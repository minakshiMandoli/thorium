const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({

    title: {
        type:String,
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
    tags: {
        type:[String]
    },
    category: {
        type: [String],
        required: true,
       // enum: ["technology", "entertainment", " lifestyle", "food", "fashion"]
    },
    subcategory: {
        type: [String],
     //   enum:  ["web development", "mobile development", "AI", "ML"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
         default: false
         },
    publishedAt:{
        type:Date,
        default: Date.now()
    }

}, { timestamps: true })

module.exports = mongoose.model('blogModel', blogSchema)