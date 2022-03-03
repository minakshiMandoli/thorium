//const { count } = require("console")

const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
const PublisherModel= require("../models/publisherModel")





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
    authorID= book.author_id
    publisherID= book.publisher_id
    if(!authorID){
        return res.send(" Enter Author ID ")
    }
        if(!publisherID){
            return res.send(" Enter Publisher ID ")
        }
            const isValid1= await AuthorModel.findById(authorID)
            const isValid2=  await PublisherModel.findById(publisherID )
            if(!isValid1){
                return  res.send(" Auther Id is not valid")
               }
            
                       
            
          if(!isValid2){
           return res.send(" Publisher Id is not valid")
          }
  

    let bookCreated = await BookModel.create(book)
    res.send({data: bookCreated})
}
const getBooksWithAuthorDetails = async function (req, res) {
        let specificBook = await BookModel.find().populate('author_id publisher_id')
        res.send({data: specificBook})
}

const putBooks= async function(req, res) {
  let a=  await PublisherModel.find({publisher_name:{$eq:["SHarperCollins","Penguin," ]}}.select({_id:1}))
   let b= await BookModel.updateMany({publisher_name:{$in:a}},
    {$set:{isHardcover:true}})
        
    res.send("hardCover set to true")
}

const changeBookPrice =async function(req, res) {
let books =await AuthorModel.find({ratings: {$gt:3.5}}).select({_id:1})
 let b= await BookModel.updateMany(
 { author_id:{$in : books} },
 {$inc :{price: 10}},{new:true}
)
res.send("price changed")
}

module.exports.changeBookPrice=changeBookPrice
module.exports.createAuthor= createAuthor
module.exports.createPublisher= createPublisher
module.exports.createBook= createBook
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.putBooks= putBooks

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
