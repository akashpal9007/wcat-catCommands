const fs = require("fs");

let inputArr = process.argv.slice(2);
// console.log(input);

let filesArr = [];
let optionsArr = [];
for(let i=0;i<inputArr.length;i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == '-'){
        optionsArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }   
}
// console.log(filesArr);
for(let i=0;i<filesArr.length;i++){
    let doesExist = fs.existsSync(filesArr[i]);
    if(!doesExist){
        console.log(filesArr[i] + " does not exists");
        process.exit();  
    }
}

let content = "";
for(let i=0;i<filesArr.length;i++){
    let fileContent = fs.readFileSync(filesArr[i]);
    content += fileContent+"\n";
}
// console.log(content);
let contentArr = content.split("\r\n");
console.log(contentArr);
// console.log(optionsArr);

let isSPresent = optionsArr.includes('-s');
// console.log(isSPresent);
if(isSPresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i-1] = null;
        }
    }
}
let tempArr = [];
for(let i=0;i<contentArr.length;i++){
    if(contentArr[i] != null){
        tempArr.push(contentArr[i]);
    }
}
// console.table(tempArr);
contentArr = tempArr;

let indexOfN = optionsArr.indexOf('-n');
let indexOfB = optionsArr.indexOf('-b');

let finalOption = "";

if(indexOfN != -1 && indexOfB != -1){
    if(indexOfB < indexOfN){
        finalOption = "-b";
    }else{
        finalOption = "-n";
    }
}else {
    if(indexOfB != -1){
        finalOption = "-b";
    }else if(indexOfN != -1){
        finalOption = "-n";
    }
}

if(finalOption == "-n"){
    modifyContentByN();
}else if(finalOption == "-b"){
    modifyContentByB();
}

function modifyContentByN(){
    for(let i=0;i<contentArr.length;i++){
        // console.log(i+1 +") "+ contentArr[i]);
        contentArr[i] = i+1 +") " + contentArr[i];
    }
}
function modifyContentByB(){
    let j=1; 
        for(let i=0;i<contentArr.length;i++){
            if(contentArr[i] != ""){
                // console.log(j +") "+ contentArr[i]);
                contentArr[i] = j +") " + contentArr[i];
                j++;
            }
        }
}
console.log(contentArr);