
    let players=[ {

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
  
    {
  
      "name": "lokesh",
    
      "dob": "1/1/1996",
    
      "gender": "male",
    
      "city": "delhi",
    
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
  
  let player=req.body.nextPlayer;
  for(let i=0; i<players.length; i++){
      if(player!==players[i].name){
      players.push(player)
      }
  }
  
  module.exports.newPlaerAdded = newPlayer;