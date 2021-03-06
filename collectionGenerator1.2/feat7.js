//________________________________________________________Spiral _____________________________________________________________
function feat7(_a) {

//directionchange
 var irreg = Math.random() >= 0.7;

  var rn = int(random(_a.anchors.length));

  this.origin = _a.anchors[rn];
  this.size = random(sizeMin, sizeMax);
  //this.size = random(0, xSpacer / 15);

  //revisit random range
  var h = this.size;
  var w = this.size;

  var length = random(xSpacer/10, xSpacer/2);
  var a = 0;
  //var r = random(.1,20);
  var r = random(.5, this.size/1.25);
  //var r = 1;

//clean spiral
if (Math.random() >= 0.5) {
  var aDelt = random(.02,.2);
  var rDelt = random(.02,.2);
}
//radial interferance
else{
  var aDelt = random(.2,.9);
  var rDelt = random(.02,.2);
  r*=random(-1.5,1.5);
}



  //radial

//scribble

//curved line


  setColor();

  this.display = function() {
    if(debug){
    console.log("display 7");
  }
    push();

    strokeWeight(random(.5,3));
    noFill();

    beginShape()

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
