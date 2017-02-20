//_____________________________________________________________line 2_____________________________________________________________
function feat4(_a) {

  this.isRotated = Math.random() >= 0.5;

  //does the line repeat?
  var repeat = Math.random() >= 0.5;
  //var repeat = false;


  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];
  if (debug) {
    console.log("I pulled anchor " + rn);
    console.log("line 2 at " + this.origin.x + ", " + this.origin.y);
  }
  //revisit -- mke range proportional to grid



  var size = random(50, 100);
  //revisit random range
  var h = random(size);
  var w = random(size);

  this.display = function() {
    console.log("display 4");
    //set color
    // var col=int(random(3));
    // stroke(red(colors[col]),green(colors[col]),blue(colors[col]),random(100,150));

    setColor();
    noFill();
    strokeWeight(random(4));
    push() //rotate
    if (this.isRotated) {
      rotate(random(360));
      //translate(this.x,this.y)
    }

    var waveX = random(xSpacer / 10000, xSpacer / 1000);
    var reps;
    if (repeat) {
      reps = int(random(2, 6));

      var sameWL = Math.random() >= 0.5;

    } else {
      reps = 1;
    }

    var lnOffset = random(ySpacer / 100);
    var lineType = int(random(5));

    push(); //translate
    for (var r = 0; r < reps; r++) {



      translate(0, reps * lnOffset);

      beginShape();

      if (!sameWL) {
        waveX *= random(.5, 1.5);
      }

      if (lineType == 1) {
        //draw spikey line
          strokeWeight(random(1.1));
        for (var i = 0; i < xSpacer * random(.5, 4); i++) {
          //2 pixel spacing on the x-axis.
          var x = i * waveX;
          //200 pixel high waveform on the y-axis.
          if (Math.random() >= 0.5) {
            //stroke(255,0,0);
            var y = cos(i * radians(2)) * random(60);
          }
          else{
          //stroke(0,255,0);
            var y = cos(i * radians(2)) * random(size);
          }

          vertex(x, y);
        }
      }
      else
      //draw sinewave
        for (var i = 0; i < xSpacer * random(0.5, 30); i++) {
        //2 pixel spacing on the x-axis.

        var x = i * waveX;


        //200 pixel high waveform on the y-axis.

        var y = sin(i * radians(2)) * size / 10;


        vertex(x, y);


      }

      endShape();

    }
    pop(); //translate
    pop(); //rotate


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
