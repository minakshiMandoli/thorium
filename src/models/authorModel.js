const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const newAuthor = new mongoose.Schema( {
    author_id: {
        type: ObjectId,
        ref: "Author"
    },
    authorName:  String,
    age: Number,
    address: String

},
 { timestamps: true });

module.exports = mongoose.model('Author', newAuthor) //books
