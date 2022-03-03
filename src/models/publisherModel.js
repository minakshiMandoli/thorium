const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const publisherSchema = new mongoose.Schema( {
   
    publisher_name: String,
    headQuarter:String

}, { timestamps: true });

module.exports = mongoose.model('Publisher', publisherSchema)
