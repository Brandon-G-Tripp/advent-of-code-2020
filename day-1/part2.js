const fs = require('fs');
const readline = require('readline');

const inputArray = [];

async function processInput() {
   const fileStream = fs.createReadStream('input.txt');

   const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
   });

   for await (const line of rl ) {
      lineAsNum = parseInt(line)
      inputArray.push(lineAsNum);
   }
   return inputArray;
}

async function tripleSumMultiplied(targetSum) {
   await processInput();
   inputArray.sort((a,b) => a - b);

   for (let i = 0; i < inputArray.length - 2; i++){
      let left = i + 1;
      let right = inputArray.length - 1;
      while(left < right) {
         const currentSum = inputArray[i] + inputArray[left] + inputArray[right];
         if(currentSum === targetSum) {
            return console.log('The product of the three numbers is ... ', inputArray[i] * inputArray[left] * inputArray[right]);
         } else if (currentSum < targetSum){
            left++;
         } else if (currentSum > targetSum) {
            right--;
         }
      }
   }
}

tripleSumMultiplied(2020);