const fs = require('fs');

let processedInput;
let busIds;
let timestamp;

function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n');
      timestamp = processedInput[0];
      busIds = processedInput[1].replace(/[x|,]/g, ' ').replace(/\s\s+/g, ' ').split(' ');
   } catch(e) {
      console.log('Error:', e.stack);
   }
}

function findNearestDepature(timestamp, busId){
   const id = parseInt(busId);
   const earliestTime = parseInt(timestamp)
   let nearestDepart = 0;
   while(nearestDepart <= earliestTime){
      nearestDepart += id;
   }
   // console.log('Timestamp:', timestamp, 'Earliest:', nearestDepart);
   return nearestDepart;
}

function findEarliestBus(timestamp, busIds){
   let closestBusId;
   let closestIdTime;
   let timestampDif = Infinity;
   for(const id of busIds){
      const nearestBusTime = findNearestDepature(timestamp, id);
      if(nearestBusTime - timestamp < timestampDif){
         timestampDif = nearestBusTime - timestamp;
         closestBusId = parseInt(id);
         closestIdTime = nearestBusTime;
      }
   }
   console.log(closestBusId * (closestIdTime - timestamp));
}


processInputSync('input.txt');
// findNearestDepature(timestamp, '37');
findEarliestBus(timestamp, busIds);