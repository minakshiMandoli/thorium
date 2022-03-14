const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.types.ObjectId

const blogSchema = new mongoose.Schema( {

    title: {
        required:true
        },
    body: {required:true},
    authorId: {
        type:ObjectId,
        required:true,
         ref: authorModel},
    tags: [String],
    category: {type:string,
         required:true,
         enum: [technology, entertainment, lifestyle, food, fashion]
        }, 
    subcategory: {type: string,
        enum:[technology-["web development", "mobile development", AI, ML ]] },
        isDeleted: {boolean, default: false}, 
        publishedAt: {boolean, default: false},
         isPublished: {boolean, default: false}

    }, {timestamps:true})

    module.exports = mongoose.model('blogModel', authorSchema)