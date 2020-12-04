const fs = require('fs');
const readline = require('readline');

let processedInput;
let modifiedInput;

// async function processInput(file) {
//    const fileStream = fs.createReadStream(file);

//    const rl = readline.createInterface({
//       input: fileStream,
//       crlfDelay: Infinity
//    });

//    for await (const line of rl ) {
//       inputArray.push(line);
//    }
//    console.log(inputArray);
// }
// .replace(/(\r\n|\n|\r)/gm,"")

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