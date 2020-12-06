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

function checkGroupAnswers(group) {
   const answerHash = {};
   for(const answer of group){
      if(answer === '\n') continue;
      if(!(answer in answerHash)){
         answerHash[answer] = true;
      }
   }
   return Object.keys(answerHash).length;
}

function sumGroupAnswers(answerList) {
   let answersSum = 0;
   for (const group of answerList) {
      answersSum += checkGroupAnswers(group);
   }
   console.log('The answer sum of answers from all groups is... ', answersSum);
}

processInputSync('input.txt');
sumGroupAnswers(processedInput);