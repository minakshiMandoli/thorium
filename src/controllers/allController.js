//const { count } = require("console")

const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
const PublisherModel= require("../models/publisherModel")
const publisherModel = require("../models/publisherModel")




const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await PublisherModel.create(publisher)
    res.send({data: publisherCreated})
}

const createBook= async function (req, res) {
    let book = req.body
    if(!book.author_id){
        return res.send(" Enter Author ID ")
    }
        if(!book.publisher_id){
            return res.send(" Enter Publisher ID ")
        }
            const isValid1= await AuthorModel.findOne({_id: book.author_id })
            if(!isValid1){
                return  res.send(" Auther Id is not valid")
               }
            
            const isValid2=  await PublisherModel.findOne({_id: book.publisher_id })            
            
          if(!isValid2){
           return res.send(" Publisher Id is not valid")
          }
  

    let bookCreated = await BookModel.create(book)
    res.send({data: bookCreated})
}
const getBooksWithAuthorDetails = async function (req, res) {
        let specificBook = await BookModel.find().populate('author_id').populate('publisher_id')
        res.send({data: specificBook})
}

module.exports.createAuthor= createAuthor
module.exports.createPublisher= createPublisher
module.exports.createBook= createBook
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails

// const getAuthorsData= async function (req, res) {
//     let authors = await AuthorModel.find()
//     res.send({data: authors})
// }


// const getBooksData= async function (req, res) {
//     let books = await bookModel.find()
//     res.send({data: books})
// }

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }


// module.exports.getBooksData= getBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
