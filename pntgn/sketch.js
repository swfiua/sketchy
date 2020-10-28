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
let MaxNum=400;
let img;
let Sampleimg
//let base;
let BR, BB, BG;
let r1, b1, g1;


function preload() {

    console.log('preloading')
    Sampleimg = loadImage("SampleImg.png");
    //
    //upload img
    input = createFileInput(handleFile);
    input.position(0, 0);
}
function setup() {
    createCanvas(MaxNum, MaxNum);
    INDEXBASE = color(200);
    INDEXRES = color(100);
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
    
    fill(INDEXBASE);
    rect(25, 25, 50, 50);
    fill(INDEXRES);
    rect(25, 100, 50, 50);

    //CALC
    fill(multiply(INDEXRES, INDEXBASE));
    rect(25, 200, 50, 50);
    // fill(rSCREEN,gSCREEN,bSCREEN,255);
    // rect(25, 300, 50, 50);
    push()
    //TEST BOX
    noStroke();
    fill(INDEXBASE);
    rect(295, 190, 40, 40);
    blendMode(MULTIPLY);
    fill(INDEXRES);
    rect(305, 200, 20, 20)
    pop()

    push()
    fill(0)
    text("PRESS UP ARROW to get BASE COLOR", 0, 360)
    text("PRESS DOWN ARROW to get SHADED COLOR", 0, 375)
    text("PRESS ENTER to get ESTIMATED MULTIPLY COLOR", 0, 390)
    pop()

}

function get_color() {
    // return colur at current mouse position
    pixel = get(mouseX, mouseY)

    console.log(pixel)
    return color(pixel)
}

function multiply(a, b) {
    result = []

    for (x=0; x<3; x++) {
        result.push(255 * a.levels[x] / b.levels[x])
    }
    return result
}

function keyPressed() {

    //httpGet("./key?key=" + keyCode)
    if (keyCode === UP_ARROW) {
        INDEXBASE = get_color()
        console.log("Base Color VAL", INDEXBASE.levels)

    } else if (keyCode === DOWN_ARROW) {
        INDEXRES = get_color()
        console.log("SHADED VAL", INDEXRES.levels)
        
    } else if (keyCode === ENTER){

        combi = multiply(INDEXRES, INDEXBASE)
        console.log("Multiply VAL", combi )

    } else if  (keyCode === TAB){

        result = overlay(INDEXRES, INDEXBASE)

        console.log("Overlay VAL", result)
    }
    
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
    //console.log(MaxNum)
    if (adjW>adjH){
        image(img, 0, 0, MaxNum, (adjH/adjW)*MaxNum);
    } else if (adjW< adjH){
        image(img, 0, 0, (adjW/adjH)*MaxNum, MaxNum);
    } else if (adjW=== adjH){
        image(img,0,0, MaxNum, MaxNum)
    }
}
function overlay(res, base){
    //formulae for calculating overlay value
    //overlay is typically used to make a given are lighter
    console.log('calculating overlay', res)
    result = []
    for (x=0; x<3; x++) {
        b = res.levels[x]
        OV = base.levels[x]
        if (b>127.5 ){
            v=(255-b)/127.5
            minV=b-(255-b)
            SourceOverlay= (OV-minV)/v
            value = round(SourceOverlay,0)
            console.log(value)
            console.log(SourceOverlay)
            //console.log(F)
        } else if (b<127.5){
            v=b/127.5
            SourceOverlay=OV/v
            value = round(SourceOverlay,0)
            console.log(value)
            //console.log(F)
        }
        result.push(value)
    }
    return result
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
