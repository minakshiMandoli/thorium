
//23feb 1st problem
//1Write a POST /players api that creates a new player 
//( that saves a player’s details and doesn’t allow saving the data of a player with a name that already exists in the data)

    const express = require('express');
    const router = express.Router();
    let arr=[
        {
            "name": "manish",
            "dob": "1/1/1995",
              "gender": "male",
             "city": "jalandhar",
             "sports": [
               "swimming"
                      ],
                      "bookings": [
          { 
              "bookingNumber":1,
              "sportId": "",
              "centerId":"",
              "type": "private",
              "slot": "16286598000000",
               "bookedOn": "31/08/2021",
               "bookedFor":"01/09/2021"
          },
            
          { 
            "bookingNumber":2,
            "sportId": "",
            "centerId":"",
            "type": "private",
            "slot": "16286598000001",
             "bookedOn": "31/08/2021",
             "bookedFor":"01/09/2021"
            }
           ]
          
          },
        
        {
        
            "name": "sachin",
          
            "dob": "2/1/1993",
          
            "gender": "male",
          
            "city": "chandigarh",
          
            "sports": [
          
              "swimming"
          
            ],
          
            "bookings": [
          { 
              "bookingNumber":1,
              "sportId": "",
              "centerId":"",
              "type": "private",
              "slot": "16286598000000",
               "bookedOn": "31/08/2021",
               "bookedFor":"01/09/2021"
          },
            
          { 
            "bookingNumber":2,
            "sportId": "",
            "centerId":"",
            "type": "private",
            "slot": "16286598000001",
             "bookedOn": "31/08/2021",
             "bookedFor":"01/09/2021"
            }
           ]
          
          },
    ]
    
    router.post('/player', function (req, res) {
      
        let details = req.body.name1.name
        let inputDetails = req.body.name1
        for (let i = 0; i < arr.length; i++) {
        if (details === arr[i].name) {
       
        res.send("Data already exist")
        }
        else
          {
        arr.push( inputDetails )
        res.send({arr})
        }
        }

    })
    

    //module.exports = router;




   // 23 feb second problem  
  //  Write an api that books a slot for a player with relevant details. The api looks like POST /players/:playerName/bookings/:bookingId
  //  Ensure the below conditions:
     //  1. PlayerName and bookingId are path params You have to ensure the playerName received must exist in the players collection. If the playerName doesn’t exist in the players collection return an error message that says something relevant about player not being found. 
     //  2. For a valid playerName check if the bookingId is already present in the player’s booking. Again, for a repeated bookingId send an error message conveying the booking was already processed. For a relevant bookingId(which is new), add the booking object from request body to bookings array.
  //  NOTE: you must create the players array outside( on the top ) of the api( so that data is maintained across api hits
  // const express = require('express');
  // const router = express.Router();
  let players=[
        {
            "name": "manish",
            "dob": "1/1/1995",
              "gender": "male",
             "city": "jalandhar",
             "sports": [
               "swimming"
                      ],
                      "bookings": [
          { 
              "bookingNumber":1,
              "sportId": "",
              "centerId":"",
              "type": "private",
              "slot": "16286598000000",
               "bookedOn": "31/08/2021",
               "bookedFor":"01/09/2021"
          },
            
          { 
            "bookingNumber":2,
            "sportId": "",
            "centerId":"",
            "type": "private",
            "slot": "16286598000001",
             "bookedOn": "31/08/2021",
             "bookedFor":"01/09/2021"
            }
           ]
          
          },
        
        {
        
            "name": "sachin",
          
            "dob": "2/1/1993",
          
            "gender": "male",
          
            "city": "chandigarh",
          
            "sports": [
          
              "swimming"
          
            ],
          
            "bookings": [
          { 
              "bookingNumber":1,
              "sportId": "",
              "centerId":"",
              "type": "private",
              "slot": "16286598000000",
               "bookedOn": "31/08/2021",
               "bookedFor":"01/09/2021"
          },
            
          { 
            "bookingNumber":2,
            "sportId": "",
            "centerId":"",
            "type": "private",
            "slot": "16286598000001",
             "bookedOn": "31/08/2021",
             "bookedFor":"01/09/2021"
            }
           ]
          
          },
    ]
   router.post('/players/:playerName/bookings/:bookingId', function (req, res) {
  let name= req.params.playerName
  let isPlayPresent=false
    for(let i=0;i<player.length;i++){
   if (players[i].name==name){
     isPlayPresent=true
   }
   if(!isPlayPresent){
     res.send("Players not found")
   }
   let booking=req.body
   let bookingId=req.params.bookingId
   for(i=0; i<players.length; i++){
     if(players[i].name==name)
     {
       for(let j=0;j<players[i].bookings.length;j++){
     if(players[i].bookings[j].bookingNumber==bookingId){
     res.send("bookingId already present in bookings")

     }
       }
       players[i].bookings.push(booking)
     }
   }
 res.send({})
    }



players
   })
   //odule.exports = router;
       

//     ASSIGNMENT: 24feb/2022
// you will be given an array of persons ( i.e an array of objects )..each person will have a {name: String , age: Number, votingStatus: true/false(Boolean)}
// take input in query param as votingAge..and for all the people above that age, change votingStatus as true
// also return an array consisting of only the person that can vote
 
 //take this as sample for array of persons:

//  const express = require('express');
// const router = express.Router();
let persons= [
 {
 name: "PK",
 age: 10,
 votingStatus: false
},
{
 name: "SK",
 age: 20,
 votingStatus: false
},
{
 name: "AA",
 age: 70,
 votingStatus: false
},
{
 name: "SC",
 age: 5,
 votingStatus: false
},
{
 name: "HO",
 age: 40,
 votingStatus: false
}
]
router.post('/post-queryAssignment', function (req, res) {
let age1=req.query.votingAge

let newPerson=[]
for(let i=0; i<persons.length; i++)

{
  if (persons[i].age>=age1)

{
  persons[i].votingStatus=true;
  newPerson.push(persons[i])
  
}
else{
  res.send({votingStatus:false})
}
}

res.send({newPerson})
})
module.exports = router;

      




