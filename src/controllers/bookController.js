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

const bookList= async function (req, res) {
    let allBooks=await BookModel.find().select({ bookName: 1, authorName: 1} )
    res.send({allBooks})
}


module.exports.createBook= createBook
//module.exports.getBooksData= getBooksData
module.exports.bookList= bookList
