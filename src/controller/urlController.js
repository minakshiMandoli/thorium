const validUrl = require("valid-url")
const shortid = require("short-id")
const urlModel = require("../model/urlModel")
const redis = require("redis");
const {promisify}  = require("util");


//Connect to redis
const redisClient = redis.createClient(
  10386,
  "redis-10386.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);

redisClient.auth("BPZINXNf82UMtUxBK2LwZyr38pcyFjNV", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


//.........generate short URL..................................................................
const shortTheUrl = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: "false", message: "no input provided" })
    }
    const longUrl = req.body.longUrl.trim()
    if (!longUrl) { return res.status(400).send({ status: "false", message: "please provide required input field" }) }

    if (!validUrl.isUri(longUrl)) {
      return res.status(400).send({ status: "false", message: "invalid long URL provide" })
    }
    const cahcedUrlData= await GET_ASYNC(`${longUrl}`)
    const newCahcedUrlData=JSON.parse(cahcedUrlData)
    if(newCahcedUrlData){
     return res.status(200).send({ status: "true", data: newCahcedUrlData })
     }
    let urlPresent = await urlModel.findOne({ longUrl: longUrl }).select({_id:0,createdAt:0,updatedAt:0,__v:0})
      if (urlPresent) { 
        await SET_ASYNC(`${longUrl}`,JSON.stringify(urlPresent))
        return res.status(200).send({ status: true, data: urlPresent }) }
  
      const baseUrl = "http://localhost:3000"
      if (!validUrl.isUri(baseUrl)) {
        return res.status(400).send({ status: "false", message: "invalid base URL" })
      }
      
      const urlCode = shortid.generate()
            let duplicateUrlCode = await urlModel.findOne({ urlCode: urlCode })
      if (!duplicateUrlCode) {
        const shortUrl = baseUrl + '/' + urlCode
        data.urlCode = urlCode,
          data.shortUrl = shortUrl
        const createUrl = await urlModel.create(data)
        
        return res.status(201).send({ status: "true", data: createUrl })
      }
    
  }
  catch (err) {
    return res.status(500).send({ status: "false", message: err.message })
  }
}

//........redirect to the original URL............................

const getShortUrl = async function (req, res) {
  try {
    const urlCode = req.params.urlCode
    let cahcedUrlCode= await GET_ASYNC(`${urlCode}`)
    if(cahcedUrlCode){
     // return res.status(302).redirect(cahcedUrlCode)
      return res.status(302).redirect(JSON.parse(cahcedUrlCode))

    }
    const url = await urlModel.findOne({ urlCode: urlCode })
    if (url) {
      
      await SET_ASYNC(`${urlCode}`,JSON.stringify(url.longUrl))
      return res.status(302).redirect(url.longUrl)
    }
    else {
      return res.status(404).send({ status: "false", message: "No such URL FOUND" })
    }
  } catch (err) {
    return res.status(500).send({ status: "false", message: err.message })
  }
}


module.exports.shortTheUrl=shortTheUrl
module.exports.getShortUrl = getShortUrl
