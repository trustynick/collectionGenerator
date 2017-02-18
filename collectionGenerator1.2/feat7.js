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
    console.log("display 7");
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
