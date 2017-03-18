//________________________________________________________Bezier_Polygon _____________________________________________________________
function feat6(_a) {

  var equalSides = Math.random() >= 0.5;
  var equalHW = Math.random() >= 0.5;
  var repeat = Math.random() >= 0.5;


  var rn = int(random(_a.anchors.length));
  if(debug){
  console.log("rn=" + rn);
}
  this.origin = _a.anchors[rn];
  //console.log("origin:"+this.origin.x+", "+this.origin.y);
  //randomized parameters
  this.isRotated = Math.random() >= 0.5;

  this.size = random(sizeMin, sizeMax);
  //var size = random(xSpacer / 10, xSpacer / 5);

  if (!equalHW) {
    var h = random(this.size/4);
    var w = random(this.size/4);
  } else {
    var h = random(this.size);
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
    if(debug){
    console.log("display 6");
  }
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
        //var cp1X = pX+random(this.size*-1,this.size);
        //var cp1Y = pY+random(this.size*-1,this.size);
        var cp1X = cos(radians(_i * tSpacing)) * (h + random(this.size / 4));
        var cp1Y = sin(radians(_i * tSpacing)) * (w + random(this.size / 4));
      } else {
        //var cp1X =cos(radians(_i * tSpacing)) * (h+random(this.size));
        //var cp1Y =sin(radians(_i * tSpacing)) * (w+random(this.size));
        var cp1X = pX;
        var cp1Y = pY;
      }

      if (Math.random() >= 0.5) {
        var cp2X = cos(radians(_i * tSpacing)) * (h + random(this.size / 4));
        var cp2Y = cos(radians(_i * tSpacing)) * (h + random(this.size / 4));
      } else {
        //var cp1X =cos(radians(_i * tSpacing)) * (h+random(this.size));
        //var cp1Y =sin(radians(_i * tSpacing)) * (w+random(this.size));
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
