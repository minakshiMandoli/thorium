const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const authorSchema = new mongoose.Schema( {
    // id: {
    //     type: ObjectId,
        
    // },
    author_name: String,
    age:Number,
    ratings: Number,
    address:String

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)
