//_____________________________________________________________ellipse class_____________________________________________________________
function feat0(_a) {

  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];

  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("ellipse at " + this.origin.x + ", " + this.origin.y);
  }

  //revisit -- mke range proportional to grid



  this.size = random(sizeMin, sizeMax);

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
      ellipse(0, 0, this.size, this.size);
    } else
      ellipse(0, 0, random(this.size), random(this.size));

    pop();
  }
  this.setAnchors = function() {
    //define anchors
    var left = createVector(this.origin.x - this.size / 2, this.origin.y);
    var right = createVector(this.origin.x + this.size / 2, this.origin.y);
    var top = createVector(this.origin.x, this.origin.y + this.size / 2);
    var bottom = createVector(this.origin.x, this.origin.y - this.size / 2);

    this.anchors = new Anchors(this.origin, top, right, bottom, left);
  }

}
