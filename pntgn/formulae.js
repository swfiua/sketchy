// let A=BaseLayer/255
// let B= ModifyingLayer/255 //ie. Multiply, div, overlay etc
// let C= EndColor/255
//GOAL: SOLVE FOR B
// //
// Multiply
//let Modemultiply=//
    //
function ModeScreen(C,A){
  if (A === 1)        {console.log("Null")
} else {
         
  let B=(C-A)/(1-A)
}
}
function ModeHardLight(C,A){
  if(Cs <= 0.5)
    B= Multiply(A, 2 * C)
else
    B = Screen(A, 2 * C -1) 
}
 //
 
 

// B=C/A
// Color Burn
// C=1-(1-B)/A

// Linear Burn 
// C=A+B-1
// //
// Screen
// C=1(1-A)*(1-B)
// Color Dodge
// C=B/(1-A)
// Linear Dodge
// C=A/B
// //
// Subtract
// C=B-A
// Divide
// C=B/A
// //
