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
  this.size = random(sizeMin, sizeMax);
  this.h;
  this.w;

  this.display = function() {
    if(debug){
console.log("display 1");
}
    if (this.isRotated) {
      rotate(random(360));
    }

    setColor();
    noStroke();


    if (this.isEqual) {
      this.h = this.size;
      this.w = this.size;
    } else {
      this.h = random(this.size);
      this.w = random(this.size);
    }

    rectMode(CENTER);
    rect(0, 0, this.h, this.w);

  }

  this.setAnchors = function() {
    var c = createVector(this.origin.x, this.origin.y);
    var tl = createVector(this.origin.x-this.w/2, this.origin.y-this.h/2);
    var tr = createVector(this.origin.x + this.w/2, this.origin.y-this.h/2);
    var bl = createVector(this.origin.x-this.w/2, this.origin.y + this.h/2);
    var br = createVector(this.origin.x + this.w/2, this.origin.y + this.h/2);

    this.anchors = new Anchors(c, tl, tr, bl, br);
  }

}
