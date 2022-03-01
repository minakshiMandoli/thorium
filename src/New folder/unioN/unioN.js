const _ = require('lodash')
const arr1= [1,2,3,4,5]
const arr2= [3,4,5,6]
const arr3= [4,5,6,7,8]
const arr4= [5,7,9,1]
const arr5= [1,8,7,2,5]

let newArray = _.union(arr1,arr2,arr3,arr4,arr5);
module.exports.myArray2 = newArray