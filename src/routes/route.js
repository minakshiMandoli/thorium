const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherContoller=require("../controllers/weatherController")
const MemesController=require("../controllers/memesController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/cowin/getVaccinationSession",CowinController.getVaccinationSession)
router.get("/weather/weatherOflondon",WeatherContoller.weatherOflondon)
router.get("/getAllMemes",MemesController.getAllMemes)
// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date
router.get("/weather/sortTheCities",WeatherContoller.sortTheCities)
router.post("/createAmeme",MemesController.createAmeme)

module.exports = router;