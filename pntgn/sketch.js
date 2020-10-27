///TO DO

//TO FIX: FILE upload box appears when custom image loaded and enter is pressed
//TO SOLVE: Storing overlay result values 

//if base color is lighter than Result value, the modifying layer can't be darken, multiply, etc. print NO if this is the case
// if base color is darker than Result value, the modifying layer can't be a lightening modifier ie. overlay, hard light, etc print NO if this is the case

// next steps:
// -add color pick option for if your base color isnt on screen
// -if click on box (base), trigger color picker. Update color with color picker 
// /same function for result
//calculate other formulae(see formulae.js)
//


//
let b;
let OV;
//let UPPER_LAYER;
let c;
let adjW;
let adjH;
let MaxNum;
let input;
let img;
let Sampleimg
//let base;
let fillVal;
let ResVal;
let ResR, ResB, ResG;
let BR, BB, BG;
let r1, b1, g1;
let rSCREEN,gSCREEN,bSCREEN;
let SourceOverlay


function preload() {

    console.log('preloading')
  Sampleimg = loadImage("SampleImg.png");
  //
  //upload img
  input = createFileInput(handleFile);
  input.position(0, 0);
}
function setup() {
  createCanvas(400, 400);
  fillVal = 200;
  INDEXBASE = color(fillVal);
  MKJ = 100;
  INDEXRES = color(MKJ);
  ResVal = 0
  r1=100
  g1=100
  b1=100
  rSCREEN=10
  gSCREEN=10
  bSCREEN=10
  MaxNum=400
  let c=0
  call2()
}

function draw() {
  background(220);
    //ellipse(mouseX, mouseY, 50, 50, fill=(255,0,0))
    //return
  //image(img,20,20);
  if (img) {
      push();
      AdjustImg(img.width,img.height);
      pop()
      //image(img,20,20);
    //Sampleimg.remove()
  } else {
      image(Sampleimg,20,20);
      Sampleimg.resize(0,250);
  }
    
  fill(fillVal);
  rect(25, 25, 50, 50);
  fill(ResVal);
  rect(25, 100, 50, 50);
  //
  BR=red(INDEXBASE);
  BG=green(INDEXBASE);
  BB=blue(INDEXBASE);
  //D
  ResR=red(INDEXRES);
  ResG=green(INDEXRES);
  ResB=blue(INDEXRES);
//CALC
  fill(r1,g1,b1,255);
  rect(25, 200, 50, 50);
  // fill(rSCREEN,gSCREEN,bSCREEN,255);
  // rect(25, 300, 50, 50);
  push()
  //TEST BOX
  noStroke();
  fill(BR,BG,BB,255);
  rect(295, 190, 40, 40);
  blendMode(MULTIPLY);
  fill(r1,g1,b1,255);
  rect(305, 200, 20, 20)
  pop()

  push()
  fill(0)
  text("PRESS UP ARROW to get BASE COLOR", 0, 360)
  text("PRESS DOWN ARROW to get SHADED COLOR", 0, 375)
  text("PRESS ENTER to get ESTIMATED MULTIPLY COLOR", 0, 390)
  pop()

}  
function keyPressed() {

    //httpGet("./key?key=" + keyCode)
  if (keyCode === UP_ARROW) {
    fillVal = get(mouseX,mouseY);
    INDEXBASE = color(fillVal);
    console.log("Base Color VAL", fillVal)

  } else if (keyCode === DOWN_ARROW) {
    ResVal = get(mouseX,mouseY);
    INDEXRES = color(ResVal);
    console.log("SHADED VAL", ResVal)
   
  } else if (keyCode === ENTER){
  r1=round(255*ResR/BR); 
  g1=round(255*ResG/BG);
  b1=round(255*ResB/BB);

    console.log("Multiply VAL",r1,g1,b1 )
  } else if  (keyCode === TAB){

    r1 = overlay(BR, ResR)

    g1 = overlay(BG, ResG)

    b1 = overlay(BB, ResB)

    console.log("Overlay VAL", r1, g1, b1)
  }
    
//   }else if (keyCode === TAB)
//       if ( BB === 1 || BR===1||BG===1)        {console.log("Null")
// } else {
//   //a is base
//   rSCREEN=abs(((ResR/255)-(BR/255)/(1-(BR/255))))
//   gSCREEN = abs(((ResG/255)-(BG/255)/(1-(BG/255))))
//   bSCREEN=abs(((ResB/255)-(BB/255)/(1-(BB/255))))
//   console.log("screen is", rSCREEN,gSCREEN,bSCREEN)
    
    

    
    
  
//   return false; // prevent default
 
}

//CREATE FILE
function handleFile(file) {
 // print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}
function AdjustImg(adjW,adjH){
  //adjW=WIDTH
  //adjH=HEIGHT
  if (adjW>adjH){
image(img, 0, 0, MaxNum, (adjH/adjW)*MaxNum);
      } else if (adjW< adjH){
image(img, 0, 0, (adjW/adjH)*MaxNum, MaxNum);
      } else if (adjW=== adjH){
        image(img,0,0, MaxNum, MaxNum)
      }
}
function overlay(b, OV){
  //formulae for calculating overlay value
  //overlay is typically used to make a given are lighter
  let Y  
  if (b>127.5 ){
      v=(255-b)/127.5
      minV=b-(255-b)
      let SourceOverlay= (OV-minV)/v
      Y = round(SourceOverlay,0)
      console.log(Y)
      console.log(SourceOverlay)
      //console.log(F)
  } else if (b<127.5){
      v=b/127.5
      let SourceOverlay=OV/v
      Y = round(SourceOverlay,0)
      console.log(SourceOverlay)
      //console.log(F)
  }
    
  return Y
}

function call1(a, b, c){

    c = a + b

    return c
}

function call2() {

    let d = 10
    let e = 20
    let f = 5
    
    let g = call1(d, e, f)

    console.log('g', g)
    console.log('f', f)
    console.log('d', d)
}
