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
  var fullSweep = Math.random() >= 0.5;
  var sweepAngle;
  if(fullSweep){
    sweepAngle=360;
  }
  else {
    sweepAngle=int(random(1,360));
  }

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

console.log("display 3");

    setColor();
    noStroke();
    beginShape();
    for (var d = 0; d < sweepAngle * this.resolution; d++) {
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
