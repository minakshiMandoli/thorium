let axious=require("axios")
const { query } = require("express")


let weatherOflondon= async function(req, res){
try{
let q= req.query.q
let appid=req.query.appid
//console.log(`query params are: ${q} ${appid}`)
let options={
    method:"get",
    url:`http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
}
let result = await axious(options)
//console.log(result.data)
res.status(200).send({ msg: result.data })
}

catch(err)
{
    console.log(err)
    res.status(500).send({ msg: err.message })
}
}


let sortTheCities= async function(req,res){
    try {
        let cities=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let newCities=[]
        for(let i=0;i<cities.length; i++){
      let obj={city:cities[i]}
        
        let options={
            method:"get",
            url:`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=3f48b2703f286febb6fe5de493ba2986`
        }
        let result = await axious(options)
        obj.temp=result.data.main.temp
        newCities.push(obj)
        console.log(newCities)
     
        }

    let sorted=newCities.sort(function(a,b){return a.temp-b.temp})
    res.status(200).send({ data: sorted })

    }
    catch(err){
        console.log(err)
        res.status(500).send({ msg: err.message }) 
    }
}
 
module.exports.weatherOflondon=weatherOflondon
module.exports.sortTheCities=sortTheCities