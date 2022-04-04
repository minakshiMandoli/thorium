const express = require('express');
const router = express.Router();
const aws = require("aws-sdk");

const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const middleWare= require("../middleware/middleWare")
const reviewController=require("../controllers/reviewController")

aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
)


let uploadFile = async (file) => {
    return new Promise( function(resolve, reject) {
      
        let s3 = new aws.S3({ apiVersion: "2006-03-01" })
    
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket", 
            Key: "Minakshi/" + file.originalname,
            Body: file.buffer
        }
console.log(uploadFile)
      s3.upload(uploadParams, function (err, data) {
            if (err) { 
                return reject({ "error": err }) 
            }
        
            return resolve(data.Location) 
          }
        
        )

    }
    )
}

router.post("/write-file-aws", async function (req, res) {
    try {
        let files = req.files
        if (files && files.length > 0) {
            let uploadedFileURL = await uploadFile(files[0])
           // let uploadedFileURL1 = await uploadFile(files[1])
            res.status(201).send({ msg: "file uploaded succesfully", data: uploadedFileURL })
        }
        else {
            res.status(400).send({ msg: "No file found" })
        }
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}
)


router.post("/register", userController.registerNewUser)
router.post("/login", userController.loginUser)
router.post("/books",middleWare.authentication,middleWare.authorization, bookController.createBook)
router.get("/books",middleWare.authentication, bookController.getBooksByQuery)
router.get("/books/:bookId",middleWare.authentication, bookController.getBooksById)
router.put("/books/:bookId",middleWare.authentication,middleWare.authorization, bookController.updateBook)
router.delete("/books/:bookId",middleWare.authentication,middleWare.authorization, bookController.deleteBook)

router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)

module.exports = router;


