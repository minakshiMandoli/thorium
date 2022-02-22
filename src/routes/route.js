let obj = require("../loggerfolder/logger.js")
let obj2 = require("../util/helper.js")
let obj3= require("../lodasH/lodasH.js")
let obj4= require("../oddNumber/oddNumber.js")
let obj5= require("../unioN/unioN.js")
let obj6= require("../fromPair/frompair.js")

const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    obj.welcome("thorium")
    console.log(obj.endpoint)
    res.send('Welcome to my application')
    res.send(obj.endpoint)
    obj2.printDate("Today is 21st feb")
    obj2.printMonth("Month is February")
    obj2.getBatchInfo("Thorium, W3D1, the topic for today is Nodejs module system")

    res.send('Welcome to my application')

    
});
module.exports = router;

router.get('/hello', function (req, res){

res.send(obj3.months)
res.send(obj4.myArray)
res.send(obj5.myArray2)
res.send(obj6.pairs2)

})




