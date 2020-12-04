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

function numberOfTrees(right, down) {
   let treeCount = 0;
   let index = 0;
   let lineCount = 0;
   inputArray.forEach(line => {
      if(lineCount !== 0){
         if(lineCount % down !== 0) {
            lineCount++;
            return;
         }
      }
      if(line[index] === '#') {
         treeCount++;
      }
      if(index + right <= line.length - 1){
         index = index + right;
      } else if(index + right > 30) {
         index = (index + right) - 31;
      }
      lineCount++;
   })
   return treeCount;
}

async function calculateSledPaths(file) {
   await processInput(file);
   console.log(numberOfTrees(1, 1))
   console.log(numberOfTrees(3, 1))
   console.log(numberOfTrees(5, 1))
   console.log(numberOfTrees(7, 1))
   console.log(numberOfTrees(1, 2))
   console.log('The multiplied total is ...', 
      numberOfTrees(1, 1) * numberOfTrees(3, 1) * numberOfTrees(5, 1) * numberOfTrees(7, 1) * numberOfTrees(1, 2)
   )
}

calculateSledPaths('input.txt');


