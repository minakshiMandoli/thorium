const OrderModel = require("../models/orderModel");
const UserModel= require("../models/userModel")
let ProductModel= require("../models/productModel")

const createOrder= async function (req, res) {
    let data= req.body
    let UserId=req.body.userId
    let ProductId= req.body.productId
    let user= await UserModel.findOne({_id:UserId})
    let product= await ProductModel.findOne({_id:ProductId})
        if(!user){
         console.log(" user not present")
         return res.send(" user not present")
        }
        if(!product){
            console.log(" product not present")
            return res.send(" product not present")
           }
    data.date= Date.now();
     savedOrder= await OrderModel.create(data)
    let contentTypeHeader = req.headers["isfreeappuser"]
    if(contentTypeHeader ="true"){
        let newUser= await OrderModel.findOneAndUpdate({userId: UserId}, {$set:{amount:0, isFreeAppUser:true} },
             {$new:true})
       return res.send({msg: newUser})
    }
    else{
        let userBalance=await UserModel.findById(UserId)
        let productAmount=await ProductModel.findById(ProductId)
        let pay=userBalance.balance-productAmount.price
        if(pay>=0)
        {let userOrder= await OrderModel.findOneAndUpdate({userId:UserId},{$set:{amount:productAmount.price,isFreeAppUser:true}},
        {$new: true})
        let newUser =await UserModel.findOneAndUpdate({_id:UserId},{$set:{balance:pay, isFreeAppUser:true}},{$new:true})
        //let result={}
    //result.data=userOrder
    //result.user= newUser
    return res.send({msg:savedOrder})
       }
       else{
           return res.send({msg: "insufficient balance"})
       }

    }
};

module.exports.createOrder= createOrder