
const middlware1= async function (req, res, next) {
    
let contentTypeHeader = req.headers["isfreeappuser"]

console.log(contentTypeHeader)
      if(!contentTypeHeader){
      console.log(" request missing a mandatory header")
      return  res.send("error")
      }
    
  next();
    }
  

      module.exports.middleware1= middlware1
     


