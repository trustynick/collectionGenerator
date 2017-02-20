//circle blob
function feat11(_a) {

  this.isRotated = Math.random() >= 0.5;
  this.isEqual = Math.random() >= 0.5;

  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];
  var filled = Math.random() >= 0.5;
  var linked = Math.random() >= 0.5;



  var tAnc1X;
  var tAnc1Y;
  var tAnc2X;
  var tAnc2Y;

  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("rect at " + this.origin.x + ", " + this.origin.y);
  }

  //revisit -- mke range proportional to grid
  var size = random(xSpacer / 30, xSpacer / 3);

  this.r1;
  this.r2;
  this.display = function() {
console.log("display 10");

    if (this.isRotated) {
      rotate(random(360));
    }
push();
    setColor();
    noStroke();
      this.h = random(size);
      this.w = random(size);
    //rect(this.h,0,10,10);
    circBlob(this.h, random(2,7), .7);

pop();

  }

  this.setAnchors = function() {
    var c = createVector(this.origin.x + this.w / 2, this.origin.y + this.h / 2);
    var tl = this.origin;
    var tr = createVector(this.origin.x + this.w, this.origin.y);
    var bl = createVector(tAnc1X, tAnc1Y);
    var br = createVector(tAnc2X, tAnc2Y);

    this.anchors = new Anchors(c, tl, tr, bl, br);
  }

  circBlob = function(rad, num, spread){
    this.circCenters = [];


    for(var i=0; i<num; i++){
      var x = random(rad*spread*-1, rad*spread);
      var y =random(rad*spread*-1, rad*spread);

      this.circCenters.push(createVector(x, y));

      ellipse(this.circCenters[i].x,this.circCenters[i].y, random(rad));


if(linked){
      if(i!=0){
      push();
      //setColor();
      strokeWeight(random(1,3));
      line(this.circCenters[i-1].x,this.circCenters[i-1].y,this.circCenters[i].x,this.circCenters[i].y);
      pop();
    }
  }

      if(i==2){
        tAnc2X=x;
        tAnc2Y=y;
      }
      if(i==1){
        tAnc1X=x;
        tAnc1Y=y;
      }
    }
  }


}
