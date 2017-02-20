var items = [];
//var totFeats = 7;
var totFeats = 12;
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

var debug = false;
//var debug = true;

cW;
cH;

function setup() {
  if (debug) {
    cols = 3;
    rows = 3
  }

  //gen colors
  for (i = 0; i < 3; i++) {
    colors.push(color(random(255), random(255), random(255), 255));
  }

  cW = (cols + 1) * xSpacer;
  cH = (rows + 1) * ySpacer;


  c = createCanvas(cW, cH);

  // var scaleAmount = windowHeight/cH;
  // scale(scaleAmount);

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
      items[a][j].display();

    }
  }
}

function draw() {
  for (a = 0; a < cols; a++) {
    for (j = 0; j < rows; j++) {

i//tems[a][j].display();
    }
  }

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    saveCanvas(c, 'Collected_' + year() + '_' + month() + '_' + day() + '_' + hour() + '_' + minute() + '_' + second() + '.jpg', 'jpg');
    console.log("saved");
  }
}



//____________________________________________item class____________________________________________
function Item(_x, _y) {
  //for debugging set each item to a single color for easy differntitation
  if (debug) {
    var itemColor = color(random(255), random(255), random(255), 255);
    for (i = 0; i < 3; i++) {
      colors[i] = itemColor;

      push();
      stroke(0,10);
      strokeWeight(1);
      line(0,_y, cW,_y);
      line(_x,0, _x,cH);
      stroke(200,0,0,10);
      noFill();
      rectMode(CENTER);
      rect(_x,_y,xSpacer,ySpacer);
      pop();
    }
  }

  //how many features does it have
  this.featNum = int(random(minFeat, maxFeat));
  //set center coordinates
  this.x = _x;
  this.y = _y;

  //initialize anchors object to pass to first feature;
  var c = createVector(this.x, this.y);
  var initAnchors = new Anchors(c, c, c, c, c);
  //console.log(initAnchors.)
  //
  this.feats = [];

  for (var z = 0; z < this.featNum; z++) {
    var name = window["feat" + int(random(totFeats))];
    //var name = window["feat" + 5];
    if (z === 0) {
      this.feats.push(new name(initAnchors));
    } else {
      this.feats.push(new name(this.feats[z - 1].anchors));
      //feats.push(new name(initAnchors));
    }

//check centering
    for (var f = 0; f < 4; f++) {
      var test = checkEdges(createVector(this.feats[z].origin.x, this.feats[z].origin.y), createVector(_x, _y), margin/2);
      if (test !== 4) {
        console.log("_____________________________________________test: " + test);
      }
      switch (test) {
        //
        case 0: //too far right
          if (debug) {
            fill(255, 0, 0);
            rect(this.feats[z].origin.x, this.feats[z].origin.y, 10, 10);
          }

          //more left
          this.feats[z].origin.x = random(_x-xSpacer*margin/2, _x+xSpacer*margin/2);
          if (debug) {
            console.log("right edge");
            push();
            stroke(255,0,0);
            strokeWeight(1);
            line(_x,_y,this.feats[z].origin.x,this.feats[z].origin.y);
            pop();
          }
          break;

        case 1: //too far left
          if (debug) {
            fill(0, 255, 0);
            rect(this.feats[z].origin.x, this.feats[z].origin.y, 10, 10);

          }

          //move right
          this.feats[z].origin.x = random(_x-xSpacer*margin/2, _x+xSpacer*margin/2);

          if (debug) {
            console.log("left edge");
            push();
            stroke(0,255,0);
            strokeWeight(1);
            line(_x,_y,this.feats[z].origin.x,this.feats[z].origin.y);
            pop();
          }
          break;

        case 2:
          if (debug) {
            fill(0, 0, 255);
            rect(this.feats[z].origin.x, this.feats[z].origin.y, 10, 10);

          }
          this.feats[z].origin.y = random(_y-ySpacer*margin/2, _y+ySpacer*margin/2);
          if (debug) {
            console.log("bottom edge");
            push();
            stroke(255,0,255);
            strokeWeight(1);
            line(_x,_y,this.feats[z].origin.x,this.feats[z].origin.y);
            pop();
          }
          break;

        case 3:
          if (debug) {
            fill(255, 255, 0);
            rect(this.feats[z].origin.x, this.feats[z].origin.y, 10, 10);
          }
          this.feats[z].origin.y = random(_y-ySpacer*margin/2, _y+ySpacer*margin/2);
          if (debug) {
            console.log("top edge");
            push();
            stroke(255,255,0);
            strokeWeight(1);
            line(_x,_y,this.feats[z].origin.x,this.feats[z].origin.y);
            pop();
          }
          break;

        case 4:
          break;

      }
    }


    if (debug) {
      //draw pink circle at center
      fill(255,0,255);
      ellipse(this.feats[z].origin.x, this.feats[z].origin.y, xSpacer / 45, xSpacer / 45);
    }

    push();//translate
    translate(this.feats[z].origin.x, this.feats[z].origin.y);

    //console.log( )
    //this.feats[z].display();
    this.feats[z].setAnchors();
    pop(); //translate
  }


  this.display = function(){

    for (var i = 0; i < this.featNum; i++) {
      push();
      translate(this.feats[i].origin.x, this.feats[i].origin.y);
    this.feats[i].display();
    pop();
  }

  }

}

//___________________________check edges_____________________________________________________________

function checkEdges(_a, _b, _m) {
  //right
  if (_a.x > _b.x + xSpacer * _m) {
    //if (_a.x > _b.x) {

    if (debug) {
      console.log(_a.x + ", " + (_b.x + xSpacer * _m));
    }
    return 0;
  }
  //left
  else if (_a.x < _b.x - xSpacer * _m) {
    if (debug) {
      console.log(_a.x + ", " + (_b.x - xSpacer * _m));
    }
    return 1;
  }
  //bottom
  else if (_a.y > _b.y + ySpacer * _m) {
    if (debug) {
      console.log(_a.y + ", " + (_b.y + ySpacer * _m));
    }
    return 2;
  }
  //top
  else if (_a.y < _b.y - ySpacer * _m) {
    if (debug) {
      console.log(_a.y + ", " + (_b.y - ySpacer * _m));
    }
    return 3;
  }
  else
    return 4
}


// zigzag
//box
//cone
//target
//lathe

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
