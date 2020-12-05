const fs = require('fs');
const readline = require('readline');

let processedInput;
let modifiedInput;

function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n');
   } catch(e) {
      console.log('Error:', e.stack);
   }
}

function findRowNum(rowId) {
   let upper = 127;
   let lower = 0;
   for(const letter of rowId) {
      if(letter === 'F') {
         upper = Math.floor((upper + lower) / 2)
      } else {
         lower = Math.floor((upper + lower) / 2) + 1
      }
   }
   return (lower + upper) / 2;
}

function findSeatNum(seatId) {
   let right = 7;
   let left = 0;
   for(const letter of seatId) {
      if(letter === 'R') {
         left = Math.floor((right + left) / 2) + 1
      } else {
         right = Math.floor((right + left) / 2)
      }
   }
   return (right + left) / 2;
}


function iterateBoardingPasses(passes) {
   let highestSeatId = 0;
   for(const pass of passes) {
      const rowId = pass.slice(0,7);
      const seatId = pass.slice(7);
      const rowNum = findRowNum(rowId);
      const seatNum = findSeatNum(seatId);
      if(seatNum + 8 * rowNum > highestSeatId) highestSeatId = seatNum + 8 * rowNum;
   }
   console.log(highestSeatId);
}

processInputSync('input.txt');
iterateBoardingPasses(processedInput);
