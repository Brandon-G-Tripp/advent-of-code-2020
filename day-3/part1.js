const fs = require('fs');
const readline = require('readline');

const inputArray = [];

async function processInput(file) {
   const fileStream = fs.createReadStream(file);

   const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
   });

   for await (const line of rl ) {
      inputArray.push(line);
   }
   return inputArray;
}

async function numberOfTrees(file) {
   await processInput(file);
   let treeCount = 0;
   let index = 0;
   inputArray.forEach(line => {
      if(line[index] === '#') {
         treeCount++;
      }
      if(index + 3 <= line.length - 1){
         index = index + 3;
      } else if(index + 3 > 30) {
         index = (index + 3) - 31;
      }
   })
   console.log('The number of trees you will hit on this path is ... ', treeCount);
}

numberOfTrees('input.txt')