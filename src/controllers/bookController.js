const { send } = require("express/lib/response")
const BookModel=require("../models/bookModel")


const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({savedData})
}

// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find()
//     res.send({allBooks})
// }

// const bookList= async function (req, res) {
//     let allBooks=await BookModel.find().select({ bookName: 1, authorName: 1} )
//     res.send({allBooks})
// }
// const getBooksInYear= async function (req, res) {
//     let booksInYear=req.params.year
//     let allBooks= await BookModel.find({publicationYear:booksInYear})
//    res.send({allBooks})
// }
// const getPerticularBooks= async function (req, res) {
    
   
// }
// const getXINRBooks= async function (req, res) {
//   let allBooks= await BookModel.find({ $or: [{price : { $in: [100,200] }}]})
//   res.send({allBooks})
// }
// const getRandomBooks= async function (req, res) {
//     let allBooks= await BookModel.find( { 
//             $or: [ {isStockAvailable: true } , {totalPages:{$gt: 500} }]
//          } )
//    res.send({allBooks})
// }









//module.exports.getBooksData= getBooksData
module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks
module.exports.getPerticularBooks= getPerticularBooks





