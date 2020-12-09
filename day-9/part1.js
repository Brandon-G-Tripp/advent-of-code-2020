const fs = require('fs');

let processedInput;
let modifiedInput = [];
const tempArray = ['34',  '15', '45', '16', '30',  '43', '36', '21',  '32',
'18',  '14', '31', '47', '41',  '22', '39', '9',   '38',
'6',   '7',  '42', '46', '4',   '3',  '8',]


function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n');
      console.log(processedInput);
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