// let obj = require("../loggerfolder/logger.js")
// let obj2 = require("../util/helper.js")
// let obj3= require("../lodasH/lodasH.js")
// let obj4= require("../oddNumber/oddNumber.js")
// let obj5= require("../unioN/unioN.js")
// let obj6= require("../fromPair/frompair.js")

//const express = require('express');
//const res = require('express/lib/response');
//const router = express.Router();

// router.get('/test-me', function (req, res) {
//     obj.welcome("thorium")
//     console.log(obj.endpoint)
//     res.send('Welcome to my application')
//     res.send(obj.endpoint)
//     obj2.printDate("Today is 21st feb")
//     obj2.printMonth("Month is February")
//     obj2.getBatchInfo("Thorium, W3D1, the topic for today is Nodejs module system")

//     res.send('Welcome to my application')

    
// });
   //module.exports = router;

// router.get('/hello', function (req, res){

// //res.send(obj3.months)
// //res.send(obj4.myArray)
// //res.send(obj5.myArray2)
// //res.send(obj6.pairs2)

// });

const express = require('express');
const router = express.Router();
//const res = require('express/lib/response');
//1. This API will fetch all movies from the array

router.get('/movies',function(req, res)
{
    res.send('["Fukrey", "Delhi", "Dabang","Rockstar", "Suryavanshi"]')
});

//2 this API will fetch all movie by index id from array
router.get('/moviez/:idMovie', function(req,res){
    let mov= ["Fukrey", "Delhi", "Dabang","Rockstar", "Suryavanshi"]
    let value=req.params.idMovie;
    if (value>mov.length-1) {
        res.send("this movie doesn't exit")
    } else {
        res.send(mov[value])
        
    }

});


//3 this API will fetch array of objects
router.get('/films', function (req, res) {
    let movies = [{
        id: 1,
        name: 'The Shining'
       }, {
        id: 2,
        name: 'Incendies'
       }, {
        id: 3,
        name: 'Rang de Basanti'
       }, {
        id: 4,
        name: 'Finding Demo'
       }];
    res.send(movies);
});
// 4 this API will fetch array
// andif index is greater than the valid maximum value a message is returned that tells the user to use a valid index in an error message.
router.get('/films/:filmId', function (req, res) {
    let movies = [{
        id: 1,
        name: 'The Shining'
       }, {
        id: 2,
        name: 'Incendies'
       }, {
        id: 3,
        name: 'Rang de Basanti'
       }, {
        id: 4,
        name: 'Finding Demo'
       }];
       let flag = 0;
       let id = req.params.filmId;
       for (let i=0; i<movies.length; i++){
           if (id == movies[i].id){
            res.send(movies[i]);
            flag = 1;
            break;
           }
       }
       if (flag == 0)
           res.send("No movie exists with this id.");
    res.send(movies);
});

module.exports = router;


