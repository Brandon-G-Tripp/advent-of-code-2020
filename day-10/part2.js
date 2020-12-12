const fs = require('fs');

let processedInput;

class Node {
   constructor(name) {
     this.name = name;
     this.children = [];
   }
 
   addChild(name) {
     this.children.push(new Node(name));
     return this;
   }
 
   depthFirstSearch(array) {
     array.push(this.name);
       for (const child of this.children){
          child.depthFirstSearch(array);
       }
       return array;
   }
 }


function processInputSync(file){
   try {  
      const data = fs.readFileSync(file, 'utf8');
      processedInput = data.split('\n').sort((a,b)=> a - b).reverse();
      // console.log(processedInput)
   } catch(e) {
      console.log('Error:', e.stack);
   }
}
let root;
function buildTree(input, root){
   root = new Node(input[0])
   nodeDescendents(0, root, input);
   // console.log(root);
}

function nodeDescendents(index, parentNode, input) {
   let marker = index + 1;
   let childNodes = [];
   while(input[index] - input[marker] <= 3 && marker < input.length) {
      let newNode = parentNode.addChild(input[marker]);
      childNodes.push([marker, newNode]);
      marker++;
      parentNode.children.forEach(child => {
         return nodeDescendents(marker, child, input);
      })
   }
}

processInputSync('input.txt');
buildTree(processedInput, root);
console.log(root);