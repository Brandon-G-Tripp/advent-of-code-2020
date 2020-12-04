const fs = require('fs');
const readline = require('readline');

const inputArray = [];
const modifiedArray = [];

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

async function inputBreakup(file) {
   await processInput(file);
   inputArray.forEach(item => {
      modifiedArray.push(item.split(' '));
   })
   return modifiedArray;
}

async function verifyPasswords(file) {
   await inputBreakup(file);
   let correctPasswords = 0;
   modifiedArray.forEach(item => {
      const range = item[0].split('-');
      const letter = item[1][0];
      const firstPostion = range[0] - 1;
      const secondPosition = range[1] - 1;
      const password = item[2];
      
      if(password[firstPostion] === letter && password[secondPosition] !== letter 
         || password[firstPostion] !== letter && password[secondPosition] === letter) {
         correctPasswords++
      }
   })
   console.log('The number of correct passwords is... ', correctPasswords)
}

verifyPasswords('input.txt')