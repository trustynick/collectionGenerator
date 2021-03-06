var items = [];
//var totFeats = 7;
var totFeats = 8;
colors = [];
var xSpacer = 500;
var ySpacer = 500;
var cols = 10;
var rows = 10;
var c;
var minFeat = 3;
var maxFeat = 7;
var margin = 0.5;

var ColorCounter = 0;

//var debug = true;
var debug = false;

function setup() {

  if (debug) {
    cols = 3;
    rows = 3;

  }

  //gen colors
  for (i = 0; i < 3; i++) {
    colors.push(color(random(255), random(255), random(255), 255));
  }

  c = createCanvas((cols + 1) * xSpacer, (rows + 1) * ySpacer);
  if (debug) {
    console.log("w: " + width + "h: " + height);
  }
  //background(255, 253, 250);
  background(254, 254, 250);


  //create item obejcts
  for (a = 0; a < cols; a++) {
    items[a] = [];
    for (j = 0; j < rows; j++) {


      // var x= i*width/cols+xSpacer/2;
      // var y= j*height/rows+ySpacer/2;
      var x = a * xSpacer + xSpacer;
      var y = j * ySpacer + ySpacer;


      items[a].push(new Item(x, y));
      if (debug) {
        console.log(a + ", " + j);
      }
      //items[i][j].display();


    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    saveCanvas(c, 'Collected_' + year() + '_' + month() + '_' + day() + '_' + hour() + '_' + minute() + '_' + second() + '.jpg', 'jpg');
    console.log("saved");
  }
}

//item class

function Item(_x, _y) {

  //for debugging set each item to a single color for easy differntitation
  if (debug) {
    var itemColor = color(random(255), random(255), random(255), 255);
    for (i = 0; i < 3; i++) {
      colors[i] = itemColor;
    }
  }

  this.itemFeats = int(random(minFeat, maxFeat));
  this.x = _x;
  this.y = _y;

  if (debug) {
    fill(255, 0, 0);
    ellipse(this.x, this.y, xSpacer / 40, xSpacer / 40);
    noFill();
    stroke(0);
    rect(this.x - xSpacer / 2, this.y - ySpacer / 2, xSpacer, ySpacer);
    stroke(0, 0, 255);
    rect(this.x - xSpacer * margin / 2, this.y - ySpacer * margin / 2, xSpacer * margin, ySpacer * margin);
  }
  //initialize anchors object to pass to first feature;
  var c = createVector(this.x, this.y);
  // var t = createVector(this.x, this.y - random(ySpacer / 2));
  // var b = createVector(this.x, this.y + random(ySpacer / 2));
  // var r = createVector(this.x + random(xSpacer / 2), this.y);
  // var l = createVector(this.x - random(xSpacer / 2), this.y);
  var initAnchors = new Anchors(c, c, c, c, c);
  //console.log(initAnchors.)

  var feats = [];


  for (var z = 0; z < this.itemFeats; z++) {
    var name = window["feat" + int(random(totFeats))];
    //var name = window["feat" + 5];
    if (z === 0) {
      feats.push(new name(initAnchors));
    } else {
      feats.push(new name(feats[z - 1].anchors));
      //feats.push(new name(initAnchors));
    }




    for (var f = 0; f < 4; f++) {


      var test = checkEdges(createVector(feats[z].origin.x, feats[z].origin.y), createVector(_x, _y), margin);

      if (test !== 4) {
        console.log("_____________________________________________test: " + test);
      }

      switch (test) {
        case 0:
          if (debug) {
            fill(255, 0, 0);
            rect(feats[z].origin.x, feats[z].origin.y, 10, 10);

          }

          feats[z].origin.x = _x + xSpacer * margin / 2;
          if (debug) {
            console.log("right edge");
          }
          break;

        case 1:
          if (debug) {
            fill(255, 0, 0);
            rect(feats[z].origin.x, feats[z].origin.y, 10, 10);

          }
          feats[z].origin.x = _x - xSpacer * margin / 2;
          if (debug) {
            console.log("left edge");
          }
          break;

        case 2:
          if (debug) {
            fill(255, 0, 0);
            rect(feats[z].origin.x, feats[z].origin.y, 10, 10);

          }
          feats[z].origin.y = _y + ySpacer * margin / 2;
          if (debug) {
            console.log("bottom edge");
          }
          break;

        case 3:
          if (debug) {
            fill(255, 0, 0);
            rect(feats[z].origin.x, feats[z].origin.y, 10, 10);
          }
          feats[z].origin.y = _y - ySpacer * margin / 2;
          if (debug) {
            console.log("top edge");
          }
          break;

        case 4:
          break;

      }
    }

    if (debug) {
      fill(0);
      ellipse(feats[z].origin.x, feats[z].origin.y, xSpacer / 45, xSpacer / 45);

    }

    push();
    translate(feats[z].origin.x, feats[z].origin.y);

    //console.log( )
    feats[z].display();
    feats[z].setAnchors();
    pop();
  }
}



//_____________________________________________________________ellipse class_____________________________________________________________
function feat0(_a) {

  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];

  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("ellipse at " + this.origin.x + ", " + this.origin.y);
  }


  var diameter = random(xSpacer / 30, xSpacer / 3);

  this.isRotated = Math.random() >= 0.5;
  this.isEqual = Math.random() >= 0.5;

  this.display = function() {

    setColor();
    noStroke();
    push();

    translate(this.origin, this.origin);
    if (this.isRotated) {
      rotate(random(360));
    }

    if (this.isEqual) {
      ellipse(0, 0, diameter, diameter);
    } else
      ellipse(0, 0, random(this.diameter), random(this.diameter));

    pop();
  }
  this.setAnchors = function() {
    //define anchors
    var left = createVector(this.origin.x - diameter / 2, this.origin.y);
    var right = createVector(this.origin.x + diameter / 2, this.origin.y);
    var top = createVector(this.origin.x, this.origin.y + diameter / 2);
    var bottom = createVector(this.origin.x, this.origin.y - diameter / 2);

    this.anchors = new Anchors(this.origin, top, right, bottom, left);
  }

}


//_____________________________________________________________rect_____________________________________________________________
function feat1(_a) {

  this.isRotated = Math.random() >= 0.5;
  this.isEqual = Math.random() >= 0.5;

  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];

  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("rect at " + this.origin.x + ", " + this.origin.y);
  }

  //revisit -- mke range proportional to grid
  var size = random(xSpacer / 30, xSpacer / 3);
  this.h;
  this.w;

  this.display = function() {


    if (this.isRotated) {
      rotate(random(360));
    }

    setColor();
    noStroke();


    if (this.isEqual) {
      this.h = size;
      this.w = size;
    } else {
      this.h = random(size);
      this.w = random(size);
    }

    rect(0, 0, this.h, this.w);

  }

  this.setAnchors = function() {
    var c = createVector(this.origin.x + this.w / 2, this.origin.y + this.h / 2);
    var tl = this.origin;
    var tr = createVector(this.origin.x + this.w, this.origin.y);
    var bl = createVector(this.origin.x, this.origin.y + this.h);
    var br = createVector(this.origin.x + this.w, this.origin.y + this.h);

    this.anchors = new Anchors(c, tl, tr, bl, br);
  }

}

//_____________________________________________________________line 1_____________________________________________________________
function feat2(_a) {

  this.isRotated = Math.random() >= 0.5;
  this.isEqual = Math.random() >= 0.5;
  this.repeats = Math.random() >= 0.7;

  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];

  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("line 1 at " + this.origin.x + ", " + this.origin.y);
  }

  //revisit -- mke range proportional to grid
  var size = random(50, 100);
  //revisit random range
  //var h = this.origin = _a.anchors[int(random(_a.anchors.length))] * random(-1.5, 1.5);
  //var w = this.origin = _a.anchors[int(random(_a.anchors.length))] * random(-1.5, 1.5);
  var h = random(size);
  var w = random(size);


  this.display = function() {

    var reps = 1;
    var lengthOS = 0;
    if (this.repeats) {
      reps = int(random(6));
      this.spacer = random(size / 10, size / 3);
    }

    strokeWeight(random(5));

    push();
    if (this.isRotated) {
      rotate(random(360));
    }


    setColor();
    for (var i = 0; i < reps; i++) {

      if (Math.random() >= 0.9) {
        setColor();
      }

      //line(0, 0, h, w);
      if (this.repeats) {
        //stroke(255,0,0);
      }
      line(0, 0 + this.spacer * i, w + lengthOS, 0 + this.spacer * i);

      //does line weight shift?
      if (Math.random() >= 0.75) {
        strokeWeight(random(5));
      }

      //does line length shift?
      if (Math.random() >= 0.5) {
        lengthOS = (size * -1, size);
      }

      //does line rotate?
      if (Math.random() >= 0.5) {
        rotate(1.5708);
      }

      //does line translate?
      if (Math.random() >= 0.5) {
        translate(w * -.5, w * .5);
      }


    }

    pop();

  }

  this.setAnchors = function() {
    //define anchors
    var c = createVector(this.origin.x + w / 2, this.origin.y + h / 2);
    var tl = this.origin;
    var tr = createVector(this.origin.x + w, this.origin.y);
    var bl = createVector(this.origin.x, this.origin.y + h);
    var br = createVector(this.origin.x + w, this.origin.y + h);

    this.anchors = new Anchors(c, tl, tr, bl, br);
  }
}

//_____________________________________burst1_________________________________________________________
//burst 1
function feat3(_a) {

  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];

  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("burst at " + this.origin.x + ", " + this.origin.y);
  }

  this.size = random(xSpacer / 20, xSpacer / 5);
  if (Math.random() >= 0.5) {
    this.resolution = random(.02, 15);
  } else
    this.resolution = random(.01, .04);


  if (Math.random() >= 0.5) {
    this.depth = random(1, this.size);
  } else
    this.depth = random(0, this.size / 4);

  this.hasContour = Math.random() >= 0.5;
  this.isRotated = Math.random() >= 0.5;
  this.isEqual = Math.random() >= 0.5;



  //revisit random range
  var h = this.size * 2 + this.depth;
  var w = this.size * 2 + this.depth;



  if (this.hasContour) {
    this.countour = new Contour(this.origin.x, this.origin.y, this.size * random(0.1, 2), this.size * random(0.1, 2));
    if (debug) {
      console.log("init contour");
    }
  }

  this.display = function() {



    setColor();
    noStroke();
    beginShape();
    for (var d = 0; d < 360 * this.resolution; d++) {
      //Change the radius for every vertex
      var radius = this.size + random(this.depth);
      var a = cos(radians(d / this.resolution)) * radius;
      var b = sin(radians(d / this.resolution)) * radius;
      vertex(a, b);

    }
    if (this.hasContour) {
      this.countour.drawContour();
      //console.log("drew contour");
    }

    endShape();
  }
  this.setAnchors = function() {
    //define anchors
    var left = createVector(this.origin.x - w / 2, this.origin.y);
    var right = createVector(this.origin.x + w / 2, this.origin.y);
    var top = createVector(this.origin.x, this.origin.y - h / 2);
    var bottom = createVector(this.origin.x, this.origin.y + h / 2);

    this.anchors = new Anchors(this.origin, top, right, bottom, left);
  }


}

//_____________________________________________________________line 2_____________________________________________________________
function feat4(_a) {

  this.isRotated = Math.random() >= 0.5;

  //does the line repeat?
  var repeat = Math.random() >= 0.5;
  //var repeat = false;


  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];
  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("line 2 at " + this.origin.x + ", " + this.origin.y);
  }
  //revisit -- mke range proportional to grid



  var size = random(50, 100);
  //revisit random range
  var h = random(size);
  var w = random(size);

  this.display = function() {
    //set color
    // var col=int(random(3));
    // stroke(red(colors[col]),green(colors[col]),blue(colors[col]),random(100,150));

    setColor();
    noFill();
    strokeWeight(random(4));
    push() //rotate
    if (this.isRotated) {
      rotate(random(360));
      //translate(this.x,this.y)
    }

    var waveX = random(xSpacer / 10000, xSpacer / 1000);
    var reps;
    if (repeat) {
      reps = int(random(2, 6));

      var sameWL = Math.random() >= 0.5;

    } else {
      reps = 1;
    }

    var lnOffset = random(ySpacer / 100);
    var lineType = int(random(3));

    push(); //translate
    for (var r = 0; r < reps; r++) {



      translate(0, reps * lnOffset);
      beginShape();

      if (!sameWL) {
        waveX *= random(.5, 1.5);
      }

      if (lineType == 1) {
        //draw spikey line
        for (var i = 0; i < xSpacer * random(0.1, 3); i++) {
          //2 pixel spacing on the x-axis.


          var x = i * waveX;


          //200 pixel high waveform on the y-axis.
          if (Math.random() >= 0.75) {
            var y = cos(i * radians(2)) * random(100);
          } else
            var y = cos(i * radians(2)) * size;

          vertex(x, y);
        }
      } else
      //draw sinewave
        for (var i = 0; i < xSpacer * random(0.5, 30); i++) {
        //2 pixel spacing on the x-axis.

        var x = i * waveX;


        //200 pixel high waveform on the y-axis.

        var y = sin(i * radians(2)) * size / 10;


        vertex(x, y);


      }

      endShape();

    }
    pop(); //translate
    pop(); //rotate


  }

  this.setAnchors = function() {

    //define anchors
    var c = createVector(this.origin.x + w / 2, this.origin.y + h / 2);
    var tl = this.origin;
    var tr = createVector(this.origin.x + w, this.origin.y);
    var bl = createVector(this.origin.x, this.origin.y + h);
    var br = createVector(this.origin.x + w, this.origin.y + h);

    this.anchors = new Anchors(c, tl, tr, bl, br);
  }
}


//_____________________________________________________________Polygon _____________________________________________________________
function feat5(_a) {

  var equalSides = Math.random() >= 0.5;
  var equalHW = Math.random() >= 0.5;
  var repeat = Math.random() >= 0.5;


  var rn = int(random(_a.anchors.length));
  console.log("rn=" + rn);
  this.origin = _a.anchors[rn];
  //console.log("origin:"+this.origin.x+", "+this.origin.y);
  //randomized parameters
  this.isRotated = Math.random() >= 0.5;

  var size = random(xSpacer / 10, xSpacer / 5);

  if (!equalHW) {
    var h = random(size);
    var w = random(size);
  } else {
    var h = random(size);
    var w = h;
  }

  var numVertices = int(random(3, 20));
  var spacing = 360 / numVertices;

  var aTemp1 = createVector(100, 100);
  var aTemp2 = createVector(100, 100);

  this.display = function() {
    if (debug) {
      console.log(numVertices + " sided polygon");
    }
    push();

    setColor();
    noStroke();
    beginShape();

    //add vertecies from previous shape
    //vertex(_a.anchors[1].x-_a.anchors[0].x, _a.anchors[1].y-_a.anchors[0].y);
    //vertex(_a.anchors[2].x-_a.anchors[0].x, _a.anchors[2].y-_a.anchors[0].y);


    for (var _i = 0; _i < numVertices; _i++) {


      if (!equalSides) {
        var tSpacing = spacing * random(.5, 1.5);

      } else var tSpacing = spacing;

      var pX = cos(radians(_i * tSpacing)) * h;
      var pY = sin(radians(_i * tSpacing)) * w;
      vertex(pX, pY);

      if (_i == 1) {
        // aTemp1.x = pX;
        // aTemp1.y = pY;
        aTemp1 = createVector(pX, pY);

      }
      if (_i == 2) {
        aTemp2 = createVector(pX, pY);
      }
      //ellipse(pX,pY,20,20);
    }

    endShape();
    pop();

  }

  this.setAnchors = function() {
    //define anchors
    var c = this.origin;
    var tl = createVector(this.origin.x + aTemp1.x, this.origin.y + aTemp1.y);
    //var tl = this.origin;
    var tr = createVector(this.origin.x + aTemp2.x, this.origin.y + aTemp2.y);
    //var tr = this.origin;
    //var bl = createVector(this.origin.x, this.origin.y + h);
    //var br = createVector(this.origin.x + w, this.origin.y + h);
    var bl = this.origin;
    var br = this.origin;

    // console.log("aTemp1: " + aTemp1.x + ", " + aTemp1.y);
    // console.log("aTemp2: " + aTemp2.x + ", " + aTemp2.y);

    this.anchors = new Anchors(c, tl, tr, bl, br);
    // console.log("anchors: " + this.anchors.anchors);
  }
}

//________________________________________________________Bezier_Polygon _____________________________________________________________
function feat6(_a) {

  var equalSides = Math.random() >= 0.5;
  var equalHW = Math.random() >= 0.5;
  var repeat = Math.random() >= 0.5;


  var rn = int(random(_a.anchors.length));
  console.log("rn=" + rn);
  this.origin = _a.anchors[rn];
  //console.log("origin:"+this.origin.x+", "+this.origin.y);
  //randomized parameters
  this.isRotated = Math.random() >= 0.5;

  var size = random(xSpacer / 10, xSpacer / 5);

  if (!equalHW) {
    var h = random(size);
    var w = random(size);
  } else {
    var h = random(size);
    var w = h;
  }

  var numVertices = int(random(3, 10));
  if (Math.random() >= 0.25) {
    numVertices = int(random(3, 5));
    //console.log("gaus: " + numVertices);
  }

  var spacing = 360 / numVertices;

  var aTemp1 = createVector(100, 100);
  var aTemp2 = createVector(100, 100);

  this.display = function() {
    if (debug) {
      console.log(numVertices + " sided polygon");
    }
    push();

    setColor();
    noStroke();
    beginShape();

    //add vertecies from previous shape
    //vertex(_a.anchors[1].x-_a.anchors[0].x, _a.anchors[1].y-_a.anchors[0].y);
    //vertex(_a.anchors[2].x-_a.anchors[0].x, _a.anchors[2].y-_a.anchors[0].y);


    for (var _i = 0; _i < numVertices; _i++) {


      if (!equalSides) {
        var tSpacing = spacing * random(.5, 1.5);

      } else var tSpacing = spacing;

      var pX = cos(radians(_i * tSpacing)) * h;
      var pY = sin(radians(_i * tSpacing)) * w;

      if (Math.random() >= 0.5) {
        //var cp1X = pX+random(size*-1,size);
        //var cp1Y = pY+random(size*-1,size);
        var cp1X = cos(radians(_i * tSpacing)) * (h + random(size / 4));
        var cp1Y = sin(radians(_i * tSpacing)) * (w + random(size / 4));
      } else {
        //var cp1X =cos(radians(_i * tSpacing)) * (h+random(size));
        //var cp1Y =sin(radians(_i * tSpacing)) * (w+random(size));
        var cp1X = pX;
        var cp1Y = pY;
      }

      if (Math.random() >= 0.5) {
        var cp2X = cos(radians(_i * tSpacing)) * (h + random(size / 4));
        var cp2Y = cos(radians(_i * tSpacing)) * (h + random(size / 4));
      } else {
        //var cp1X =cos(radians(_i * tSpacing)) * (h+random(size));
        //var cp1Y =sin(radians(_i * tSpacing)) * (w+random(size));
        var cp2X = pX;
        var cp2Y = pY;
      }


      if (_i == 0) {
        vertex(pX, pY);
      } else
        bezierVertex(cp1X, cp1Y, cp2X, cp2Y, pX, pY);

      if (_i == 1) {
        // aTemp1.x = pX;
        // aTemp1.y = pY;
        aTemp1 = createVector(pX, pY);

      }
      if (_i == 2) {
        aTemp2 = createVector(pX, pY);
      }
      //ellipse(pX,pY,20,20);
    }

    endShape();
    pop();

  }

  this.setAnchors = function() {
    //define anchors
    var c = this.origin;
    var tl = createVector(this.origin.x + aTemp1.x, this.origin.y + aTemp1.y);
    //var tl = this.origin;
    var tr = createVector(this.origin.x + aTemp2.x, this.origin.y + aTemp2.y);
    //var tr = this.origin;
    //var bl = createVector(this.origin.x, this.origin.y + h);
    //var br = createVector(this.origin.x + w, this.origin.y + h);
    var bl = this.origin;
    var br = this.origin;

    // console.log("aTemp1: " + aTemp1.x + ", " + aTemp1.y);
    // console.log("aTemp2: " + aTemp2.x + ", " + aTemp2.y);

    this.anchors = new Anchors(c, tl, tr, bl, br);
    // console.log("anchors: " + this.anchors.anchors);
  }
}

//________________________________________________________Spiral _____________________________________________________________
function feat7(_a) {

//directionchange
 var irreg = Math.random() >= 0.7;

  var rn = int(random(_a.anchors.length));

  this.origin = _a.anchors[rn];
  this.size = random(0, xSpacer / 15);

  //revisit random range
  var h = this.size * 2 + this.depth;
  var w = this.size * 2 + this.depth;

  var length = random(xSpacer/10, xSpacer*2);

  var a = 0;
  //var r = random(.1,20);
  var r = this.size;

//clean spiral
if (Math.random() >= 0.5) {
  var aDelt = random(.02,.2);
  var rDelt = random(.02,.2);
}
//radial interferance
else{
  var aDelt = random(.2,.9);
  var rDelt = random(.02,.2);
  r*=random(-2,2);
}


  
  //radial

//scribble

//curved line


  // fill(255, 0, 0);
  // noStroke();
  // ellipse(this.origin.x, this.origin.y, 10, 10);
  
  setColor();

  this.display = function() {
    push();

    strokeWeight(random(.5,3));
    noFill();

    beginShape()
      //randomize


    for (var i = 0; i < length; i++) {

      var x = r * cos(a);
      var y = r * sin(a);

  if(irreg){
    a += random(aDelt);
    r += random(rDelt);
  }
  else{
      a += aDelt;
      r += rDelt;
  }
      vertex(x, y);
    }
    endShape();
    pop();
  }

  this.setAnchors = function() {
    //define anchors
    var left = createVector(this.origin.x - w / 2, this.origin.y);
    var right = createVector(this.origin.x + w / 2, this.origin.y);
    var top = createVector(this.origin.x, this.origin.y - h / 2);
    var bottom = createVector(this.origin.x, this.origin.y + h / 2);

    this.anchors = new Anchors(this.origin, top, right, bottom, left);
  }

}



//resistor




// radio signal



// zigzag
//box

//cone

//target

//lathe

//




//_________________________________________________contour functions_____________________________________________________________

function Contour(_x, _y, _h, _w) {

  // var _x=100;
  // var _y=100;
  // var _h=100;
  // var _w=100;

  this.x = _x;
  this.y = _y;
  this.h = _h;
  this.w = _w;

  var contourTypes = ["cDrawRect", "cDrawTri", "cDrawPoly", "cDrawEllipse", "cDrawBurst"];
  var cPick = int(random(contourTypes.length));

  this.drawContour = function() {
    var fnName = "this." + contourTypes[cPick];
    fnName = contourTypes[cPick];
    if (debug) {
      console.log(fnName);
    }
    window[fnName](_x, _y, _h, _w);
  }
}


function cDrawRect(_x, _y, _h, _w) {
  this.x = _x;
  this.y = _y;
  this.h = _h;
  this.w = _w;

  push();
  translate(this.x, this.y)
  beginContour();
  vertex(this.w / -2, this.h / -2);
  vertex(this.w / -2, this.h / 2);
  vertex(this.w / 2, this.h / 2);
  vertex(this.w / 2, this.h / -2);
  endContour();

  pop();
}

function cDrawTri(_x, _y, _h, _w) {
  this.x = _x;
  this.y = _y;
  this.h = _h;
  this.w = _w;

  var numVertices = 3;
  var spacing = 360 / numVertices;

  push();
  translate(this.x, this.y)

  beginContour();
  for (var _i = 0; _i < numVertices; _i++) {
    var triX = cos(radians(_i * -spacing)) * -this.h;
    var triY = sin(radians(_i * -spacing)) * -this.w;
    vertex(triX, triY);
  }


  endContour();
  //console.log("drew tri contour");
  pop();
}

function cDrawPoly(_x, _y, _h, _w) {
  this.x = _x;
  this.y = _y;
  this.h = _h;
  this.w = _w;

  var numVertices = int(random(3, 13));
  var spacing = 360 / numVertices;

  push();
  translate(this.x, this.y)

  beginContour();
  for (var _i = 0; _i < numVertices; _i++) {
    var triX = cos(radians(_i * -spacing)) * -this.h;
    var triY = sin(radians(_i * -spacing)) * -this.w;
    vertex(triX, triY);
  }


  endContour();
  pop();
}

function cDrawEllipse(_x, _y, _h, _w) {
  this.x = _x;
  this.y = _y;
  this.h = _h;
  this.w = _w;

  var numVertices = int(random(13, 360));
  var spacing = 360 / numVertices;

  push();
  translate(this.x, this.y)

  beginContour();
  for (var _i = 0; _i < numVertices; _i++) {
    var triX = cos(radians(_i * -spacing)) * -this.h;
    var triY = sin(radians(_i * -spacing)) * -this.w;
    vertex(triX, triY);
  }


  endContour();
  pop();
}

function cDrawBurst(_x, _y, _h, _w) {

  this.x = _x;
  this.y = _y;
  this.w = _w;
  this.h = _h;


  this.radius = random(this.w / 20, this.w / 6);
  //this.radius = 10;
  this.size = random(xSpacer / 20, xSpacer / 5);
  if (Math.random() >= 0.5) {
    this.resolution = random(.02, 15);
  } else
    this.resolution = random(.01, .04);


  if (Math.random() >= 0.5) {
    this.depth = random(1, this.size);
  } else
    this.depth = random(0, this.size / 4);

  noStroke();
  push();
  translate(this.x, this.y);
  beginContour();
  for (var d = 0; d < 360 * this.resolution; d++) {
    //Change the radius for every vertex
    var radius = this.radius + random(this.depth);
    var a = cos(radians(d / -this.resolution)) * -radius;
    var b = sin(radians(d / -this.resolution)) * -radius;
    vertex(a, b);

  }
  endContour();
  pop();
}

//___________________________set colors_____________________________________________________________
function setColor() {
  //var col = int(random(3));
  var col = ColorCounter;

  stroke(red(colors[col]), green(colors[col]), blue(colors[col]), random(100, 200));
  fill(red(colors[col]), green(colors[col]), blue(colors[col]), random(100, 200));
  if (ColorCounter < 2) {
    ColorCounter++;
  } else
    ColorCounter = 0;
}

//___________________________set colors_____________________________________________________________
function Anchors(_a1, _a2) {
  this.anchors = [];
  for (var i = 0; i < arguments.length; i++) {
    this.anchors.push(arguments[i]);
  }
}

//___________________________check edges_____________________________________________________________

function checkEdges(_a, _b, _m) {

  //right

  if (_a.x > _b.x + xSpacer * _m / 2) {
    if (debug) {
      console.log(_a.x + ", " + (_b.x + xSpacer * _m / 2));
    }
    return 0;
  }
  //left
  else if (_a.x < _b.x - xSpacer * _m / 2) {
    if (debug) {
      console.log(_a.x + ", " + (_b.x - xSpacer * _m / 2));
    }
    return 1;
  }
  //bottom
  else if (_a.y > _b.y + ySpacer * _m / 2) {
    if (debug) {
      console.log(_a.y + ", " + (_b.y + ySpacer * _m / 2));
    }
    return 2;
  }
  //top
  else if (_a.y < _b.y - ySpacer * _m / 2) {
    if (debug) {
      console.log(_a.y + ", " + (_b.y - ySpacer * _m / 2));
    }
    return 3;
  } else
    return 4


}