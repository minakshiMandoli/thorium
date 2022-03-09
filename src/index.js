const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const  { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/Pritesh8769811-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

const requestTime = function (req, res, next) {
    const event1 = new Date();
     const ip=req.connection.remoteAddress;
     // req.ip  aslo
     const route= req.path // req.originalUrl
    console.log(event1, ip, route);
   
    next()
  }
  app.use(requestTime)



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
