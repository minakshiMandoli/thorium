const ProductModel= require("../models/productModel")

const createProduct= async function (req, res) {
    let data= req.body
    let savedProduct= await ProductModel.create(data)
   // console.log(req.newAtribute)
    res.send({msg: savedProduct})
}

module.exports.createProduct= createProduct