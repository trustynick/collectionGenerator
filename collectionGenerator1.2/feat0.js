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
