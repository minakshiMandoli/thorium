const mongoose = require('mongoose');
const authorModel = require("../models/authorModel")

const createAuthor =async function(req,res){
try{    let data = req.body;
    let savedData = await authorModel.create(data);
    res.status(201).send({ msg: savedData }); 
}catch(error){
    
}}


module.exports.createAuthor= createAuthor