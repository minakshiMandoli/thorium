const _ = require('lodash');
  
let pairs = [['horror', 'the Shining'], ['drama', 'Titanic'], ['thriller', 'Shutter island'], ['fantaSy','Pans Labyrinth']]
  
let newPair = _.fromPairs(pairs);
  
module.exports.pairs2 = newPair
