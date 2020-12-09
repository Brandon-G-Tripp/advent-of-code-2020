// This solution is not yet correct. 

const fs = require('fs');

let processedInput;
let objOfTrees = {};


function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n');
   } catch(e) {
      console.log('Error:', e.stack);
   }
}

function processEachBag(bag) {
   let modifiedBag = (bag.replace(/ /g,'').split(/bags|bag|contain|''|,|[0-9]/)).filter(Boolean).slice(0,-1);
   const newTree = modifiedBag[0];
   let childObj = {};
   for(let i = 1; i < modifiedBag.length; i++) {
         childObj[modifiedBag[i]] = true;
   }
   objOfTrees[newTree] = childObj;
}

function constructTreeArray(input) {
   for(const bag of input){
      const bagNode = processEachBag(bag);
   }
}

let bagSum = 0;

function searchForGoldBag(key){
   if(Object.keys(objOfTrees[key]).length > 0 ) {
      if('shinygold' in objOfTrees[key]) {
        bagSum++;
        return;
      } else  {
         for(const child in objOfTrees[key]){
            if(child !== 'noother') {
               searchForGoldBag(child);
            } else {
               return;
            }
         }
      } 
   } else {
      return;
   }
}

function checkNumContainingGoldBag(objOfTrees){
   for(const key in objOfTrees) {
      searchForGoldBag(key);
   }
   console.log(bagSum);
}

processInputSync('input.txt');
constructTreeArray(processedInput, objOfTrees);
checkNumContainingGoldBag(objOfTrees);
// searchForGoldBag('vibrantcrimson');
// searchForGoldBag('paleturquoise');