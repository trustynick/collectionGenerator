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
  this.size = random(sizeMin, sizeMax);
  //revisit random range
  //var h = this.origin = _a.anchors[int(random(_a.anchors.length))] * random(-1.5, 1.5);
  //var w = this.origin = _a.anchors[int(random(_a.anchors.length))] * random(-1.5, 1.5);
  var h = random(this.size/2);
  var w = random(this.size/2);


  this.display = function() {
    if(debug){
console.log("display 2");
}
    var reps = 1;
    var lengthOS = 0;
    if (this.repeats) {
      reps = int(random(6));
      this.spacer = random(this.size / 10, this.size / 3);
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
        lengthOS = (this.size * -1, this.size);
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
