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
            // Check if Birth Year is Valid
            if(passportParts[i] === 'byr' && passportParts[i + 1].match(/^\d{4}/)) {
               if(parseInt(passportParts[i+1]) <= 2002 && parseInt(passportParts[i+1]) >= 1920) counter++;
            }
            // Check if Issue year is valid
            else if(passportParts[i] === 'iyr' && passportParts[i+1].match(/\d{4}/)) {
               if(parseInt(passportParts[i+1]) <= 2020 && parseInt(passportParts[i+1]) >= 2010) counter++;
            }
            //Check if Expiration year is valid
            else if(passportParts[i] === 'eyr' && passportParts[i+1].match(/\d{4}/)) {
               if(parseInt(passportParts[i+1]) <= 2030 && parseInt(passportParts[i+1]) >= 2020) counter++;
            }
            // Check if Height is valid
            else if(passportParts[i] === 'hgt') {
               if(passportParts[i+1][passportParts[i+1].length - 1] === 'n') {
                  if(parseInt(passportParts[i + 1].slice(0, -2)) >= 59 && parseInt(passportParts[i + 1].slice(0, -2)) <= 76) counter++;
               }
               if(passportParts[i+1][passportParts[i+1].length - 1] === 'm') {
                  if(parseInt(passportParts[i + 1].slice(0, -2)) >= 150 && parseInt(passportParts[i + 1].slice(0, -2)) <= 193) counter++;
               } 
            }  
            // Check if hair color
            else if (passportParts[i] === 'hcl' && passportParts[i+1].match(/^#[a-f0-9]{6}/)) {
               counter++;
            } 
            // Check if Eye Color
            else if (passportParts[i] === 'ecl') {
               if(passportParts[i+1] === 'amb') counter++;
               else if (passportParts[i+1] === 'blu') counter++;
               else if (passportParts[i+1] === 'brn') counter++;
               else if (passportParts[i+1] === 'gry') counter++;
               else if (passportParts[i+1] === 'grn') counter++;
               else if (passportParts[i+1] === 'hzl') counter++;
               else if (passportParts[i+1] === 'oth') counter++;    
            }
            else if(passportParts[i] === 'pid' && passportParts[i+1].length === 9) {
               if(passportParts[i+1].match(/[0-9]{9}/)) counter++;
            }
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