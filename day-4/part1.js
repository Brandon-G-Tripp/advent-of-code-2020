const fs = require('fs');
const readline = require('readline');

let processedInput;
let modifiedInput;

function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n\n');
   } catch(e) {
      console.log('Error:', e.stack);
   }
}
   
function validatePassports(input) {
   let validPassports = 0;
   const passportFields = {
      'byr': true, 
      'iyr': true,
      'eyr': true,
      'hgt': true, 
      'hcl': true, 
      'ecl': true, 
      'pid': true
   }
   for(const passport of input) {
      let passportParts = passport.split(/:| |\n/);
      let counter = 0;
      for(let i = 0; i < passportParts.length; i += 2) {
         console.log(passportParts[i])
         if(passportParts[i] in passportFields){
            counter++
         }
      }
      if(counter === 7) {
         validPassports++;
      }
   }
   return validPassports;
}
      

processInputSync('input.txt');
console.log(validatePassports(processedInput));