///TO DO

//TO FIX: FILE upload box appears when custom image loaded and enter is pressed - focus issue?
//TO SOLVE: Storing overlay result values: j5s has a store function.

//if base color is lighter than Result value, the modifying layer can't be darker, multiply, etc. print NO if this is the case
// if base color is darker than Result value, the modifying layer can't be a lightening modifier ie. overlay, hard light, etc print NO if this is the case

// next steps:
// -add color pick option for if your base color isnt on screen
// -if click on box (base), trigger color picker. Update color with color picker 
// /same function for result
//calculate other formulae(see formulae.js)
//

/* */
let MaxNum=600;
let img;
let Sampleimg;
let Mask;


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
        //push();
        AdjustImg(img.width,img.height);
        //pop()
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


    if (Mask) {
        image(Mask, 300, 0)
    }
    
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

function keyPressed() {

    //httpGet("./key?key=" + keyCode)
    if (keyCode === UP_ARROW) {
        INDEXBASE = color(get(mouseX, mouseY))
        console.log("Base Color VAL", INDEXBASE.levels)

    } else if (keyCode === DOWN_ARROW) {
        INDEXRES = color(get(mouseX, mouseY))
        console.log("SHADED VAL", INDEXRES.levels)
        
    } else if (keyCode === ENTER){

        combi = multiply(INDEXBASE, INDEXRES)
        console.log("Multiply VAL", combi )

    } else if  (keyCode === TAB){

        result = overlay(INDEXBASE, INDEXRES)

        console.log("Overlay VAL", result)

        Mask = could_be(Sampleimg, INDEXRES)
    }
    
}

function could_be(img, res) {

    mask = createImage(img.width, img.height)

    mask.loadPixels()
    for (i=0; i < mask.width; i++) {
        for (j=0; j < mask.height; j++) {
            result = i_could_be_overlay(img.get(i, j), res)
            xx = []
            for (col of result) {
                if (col) {
                    value = 255
                } else {
                    value = 0
                }
                xx.push(value)
            }
            mask.set(i, j, color(xx))
        }
    }

    mask.updatePixels()
    console.log(mask)

    return mask
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


function apply(fn, base, res){
    // apply a function to the red, green and blue of base and res
    result = []
    for (cc of [red, green, blue]) {

        value = fn(cc(base), cc(res))

        result.push(value)
    }
    return result
}


function overlay(base, res){
    //formulae for calculating overlay value
    //overlay is typically used to make a given are lighter

    console.log(base.levels, res.levels,
                'could be overlay?', i_could_be_overlay(base, res))

    console.log('calculating overlay', res)
    return apply(ioverlay, base, res)
}


function multiply(base, res) {
    // looks more like divide than multiply, solves for the multiplier
    return apply(imultiply, base, res)
}

function imultiply(base, res) {

    return 255 * res / base
}


function i_could_be_overlay(base, res) {
    return apply(could_be_overlay, base, res)
}


function could_be_overlay(base, res) {

    if (base > 127.5) {
        return res > base
    } else {
        return res < base
    }
}

function ioverlay(base, res) {
    /* returns the overlay required to turn base into res
       
     */

    b = base
    OV = res
    
    if (b>127.5 ){
        v=(255-b)/127.5

        value = 255 - (255-res)/v

        //minV=b-(255-b) // 
        //value = (OV-minV)/v
    } else if (b<127.5){
        v=b/127.5
        value = OV/v
        if (value > 255) {
            console.log('impossible value', value)
        }
    }
    return round(value, 0)
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
