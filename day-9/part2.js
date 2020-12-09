const fs = require('fs');

let processedInput;
let modifiedInput = [];


function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n');
      processedInput.forEach(item => modifiedInput.push(parseInt(item)));
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

function contiguousSum(){
   const invalidNum = checkValidSequence(modifiedInput);
   for(let num = 0; num < processedInput.length - 1; num++) {
      let lastNum = num + 1;
      let potentialSum = modifiedInput[num];
      while(potentialSum <= invalidNum) {
         potentialSum += modifiedInput[lastNum]; 
         if(potentialSum === invalidNum) {
            const contigArray = modifiedInput.slice(num, lastNum + 1)
            const maxNum = Math.max(...contigArray);
            const minNum = Math.min(...contigArray);
            return maxNum + minNum;
         } else {
            lastNum++;
         }
      }
   }
   return 'No valid contiguous sum.';
}

processInputSync('input.txt');
console.log(contiguousSum());