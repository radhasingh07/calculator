// ===========================
// Elements
// ===========================

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".buttons button");

// ===========================
// Variables
// ===========================

let expression = "";

// ===========================
// Update Display
// ===========================

function updateDisplay(){

display.value = expression || "0";

}

// ===========================
// Button Click Events
// ===========================

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const value = button.textContent;

// ===========================
// Clear
// ===========================

if(button.classList.contains("clear")){

expression="";

updateDisplay();

return;

}

// ===========================
// Delete
// ===========================

if(button.classList.contains("delete")){

expression=expression.slice(0,-1);

updateDisplay();

return;

}

// ===========================
// Equal
// ===========================

if(button.classList.contains("equal")){

return;

}

// ===========================
// Normal Buttons
// ===========================

expression += value;

updateDisplay();

});

});

// ===========================
// Prevent Multiple Operators
// ===========================

function isOperator(char){

return ["+","-","*","/","%"].includes(char);

}

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const value=button.textContent;

if(

isOperator(value) &&

expression.length>0 &&

isOperator(expression.slice(-1))

){

expression=

expression.slice(0,-1)+value;

updateDisplay();

}

});

});

// ===========================
// Prevent Multiple Decimal Points
// ===========================

buttons.forEach(button=>{

button.addEventListener("click",()=>{

if(button.textContent!==".") return;

const parts=

expression.split(/[\+\-\*\/%]/);

const last=parts[parts.length-1];

if(last.includes(".")){

expression=expression.slice(0,-1);

updateDisplay();

}

});

});

// ===========================
// Initial Display
// ===========================

updateDisplay();
// ===========================
// Calculate Result
// ===========================

function calculate(){

try{

if(expression.trim()==="") return;

expression=eval(expression).toString();

updateDisplay();

}

catch{

display.value="Error";

expression="";

}

}

// ===========================
// Equal Button
// ===========================

document.querySelector(".equal")

.addEventListener("click",calculate);

// ===========================
// Keyboard Support
// ===========================

document.addEventListener("keydown",(event)=>{

const key=event.key;

// Numbers

if(/[0-9]/.test(key)){

expression+=key;

updateDisplay();

}

// Operators

else if(["+","-","*","/","%","."].includes(key)){

const last=expression.slice(-1);

if(

isOperator(key) &&

isOperator(last)

){

expression=

expression.slice(0,-1)+key;

}

else{

expression+=key;

}

updateDisplay();

}

// Enter

else if(key==="Enter"){

event.preventDefault();

calculate();

}

// Backspace

else if(key==="Backspace"){

expression=expression.slice(0,-1);

updateDisplay();

}

// Escape

else if(key==="Escape"){

expression="";

updateDisplay();

}

});

// ===========================
// Prevent Invalid Start
// ===========================

if(

["*","/","%"].includes(expression[0])

){

expression="";

}

// ===========================
// Last Result
// ===========================

let lastResult="";

const oldCalculate=calculate;

calculate=function(){

try{

if(expression==="") return;

lastResult=eval(expression);

expression=String(lastResult);

updateDisplay();

}

catch{

display.value="Error";

expression="";

}

};

// ===========================
// Double Click Display
// Restore Last Result
// ===========================

display.addEventListener("dblclick",()=>{

if(lastResult!==""){

expression=String(lastResult);

updateDisplay();

}

});

// ===========================
// Initialize
// ===========================

updateDisplay();