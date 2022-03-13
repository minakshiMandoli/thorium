let axious = require("axios")
 let getAllMemes= async function(req, res){
try{
    let options = {
        method: "get",
        url: `https://api.imgflip.com/get_memes`
    }
    let result = await axious(options)
     res.status(200).send({ msg: result.data })
}
catch(err){
    console.log(err)
    res.status(500).send({ msg: err.message })
}

 }



 let createAmeme=async function(req,res)
 { try{
    let options = {
        method: "post",
        url: `https://api.imgflip.com/caption_image?template_id=181913649&text0=hii&text1=there&username=chewie12345&password=meme@123`
    }
    let result = await axious(options)
    res.status(200).send({ msg: result.data })
 }
 catch(err){
    console.log(err)
    res.status(500).send({ msg: err.message })
 }


 }
 module.exports.getAllMemes=getAllMemes
 module.exports.createAmeme=createAmeme