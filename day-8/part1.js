const fs = require('fs');

let processedInput;
let modifiedInput = [];


function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.replace(/\+/g,'').split('\n');
   } catch(e) {
      console.log('Error:', e.stack);
   }
}

function processInputToPairs(input){
   input.forEach(item => {
      let splitItem = item.split(' ')
      splitItem[1] = parseInt(splitItem[1]);
      modifiedInput.push(splitItem);
   })
}

function runBootFileCode(input) {
   let index = 0;
   let acc = 0;
   const visitedIndex = {};
   while(!(index.toString() in visitedIndex)){
      visitedIndex[index.toString()] = true;
      if(input[index][0] === 'acc') {
         console.log(acc);
         console.log(input[index][1]);
         acc += input[index][1];
         index++;
         console.log(acc);
      } else if (input[index][0] === 'jmp') {
         index += input[index][1];
      } else {
         index++;
      }
   }
   console.log(acc);
}

processInputSync('input.txt');
processInputToPairs(processedInput);
runBootFileCode(modifiedInput);