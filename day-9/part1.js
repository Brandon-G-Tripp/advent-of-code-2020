const fs = require('fs');

let processedInput;

function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n');
   } catch(e) {
      console.log('Error:', e.stack);
   }
}

function twoNumberSum(array, targetSum) {
   const nums = {}
   for(const num of array) {
      const potentialMatch = targetSum - num;
      if(potentialMatch in nums) {
         return true;
      } else {
         nums[num] = true;
      }
   }
   return false;
}

function checkValidSequence(array){
   const prevNums = []
   for(let i = 0; i < 25; i++){
      prevNums.push(array[i]);
   }
   for(let i = 25; i < array.length; i++){
      if(twoNumberSum(prevNums, array[i])){
         prevNums.shift();
         prevNums.push(array[i]);
      } else {
         return array[i];
      }
   }
}

processInputSync('input.txt');
console.log(checkValidSequence(processedInput));