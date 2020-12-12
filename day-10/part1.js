const fs = require('fs');

let processedInput;

function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n').sort((a,b)=> a - b);
   } catch(e) {
      console.log('Error:', e.stack);
   }
}

function joltageDifference(adapters){
   let oneJolt = 0;
   let threeJolt = 1;
   let marker = 0;
   for(const item of adapters){
      console.log(item);
      if(item - marker === 1){
         oneJolt++;
      } else  {
         threeJolt++;
      } 
      marker = item;
   }
   console.log(oneJolt * threeJolt)
}

processInputSync('input.txt');
joltageDifference(processedInput);