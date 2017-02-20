//Star
function feat8(_a) {

  this.isRotated = Math.random() >= 0.5;
  this.isEqual = Math.random() >= 0.5;
  var allPoints = Math.random() >= 0.5;

  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];
  var filled = Math.random() >= 0.5;
  var fullSweep = Math.random() >= 0.4;
  var sweepAngle;
  if(fullSweep){
    sweepAngle=TWO_PI;
  }
  else {
    sweepAngle=random(PI/2,TWO_PI);
  }


  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("rect at " + this.origin.x + ", " + this.origin.y);
  }

  //revisit -- mke range proportional to grid
  var size = random(xSpacer / 30, xSpacer / 3.5);

  this.r1;
  this.r2;


  this.display = function() {
console.log("display 8");

    if (this.isRotated) {
      rotate(random(360));
    }
push();
    setColor();

    if(filled){
    noStroke();
}
else {
  noFill();
}
      this.h = random(size);
      this.w = random(size);
    //rect(0,0,10,10);
    star(0, 0, this.h, this.w, abs(int(random(-12,20))));
    //star(0, 0, 40, 41, abs(int(random(-12,20))));

pop();

  }

  this.setAnchors = function() {
    var c = createVector(this.origin.x + this.w / 2, this.origin.y + this.h / 2);
    var tl = this.origin;
    var tr = createVector(this.origin.x + this.w, this.origin.y);
    var bl = createVector(this.origin.x, this.origin.y + this.h);
    var br = createVector(this.origin.x + this.w, this.origin.y + this.h);

    this.anchors = new Anchors(c, tl, tr, bl, br);
  }

  function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < sweepAngle; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    if(allPoints){
    vertex(sx, sy);
    //console.log("IT TRUE 1");
  }
  else{
    if(Math.random() >= 0.5){
      vertex(sx, sy);
    }
  }
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    if(allPoints){
      //console.log("IT TRUE 2");
    vertex(sx, sy);
  }
  else{
    if(Math.random() >= 0.5){
      vertex(sx, sy);
    }
  }

  }
  endShape(CLOSE);
 }

}
