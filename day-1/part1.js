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
      inputArray.push(line);
   }
   return inputArray;
}

async function calculateProduct(targetNum){
   await processInput();
   const nums = {};
   for(const item of inputArray) {
      const potentialMatch = targetNum - item;
      if (potentialMatch in nums){
        console.log('The Product of amounts adding up to 2020 is ... ', potentialMatch * item);
      } else {
         nums[item] = true;
      }
   }
   return [];
}

calculateProduct(2020)

