//radio_waves.
function feat10(_a) {

  this.isRotated = Math.random() >= 0.5;
  this.isEqual = Math.random() >= 0.5;

  var rn = int(random(_a.anchors.length));
  this.origin = _a.anchors[rn];
  var fill = Math.random() >= 0.5;
  var fullSweep = Math.random() >= 0.5;
  var numStyles=8;

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
    if(fill){
    noStroke();
}
else {
  noFill();
}


      this.h = random(size);
      this.w = random(size);

      var tAngle;

    if(fullSweep){
      tAngle=1
    }
    else{
      tAngle=random(.1,.9);
    }
    //rect(0,0,10,10);
    radioWaves(this.h, random(.01,.5), random(.01,.5), random(15),int(random(1,numStyles+1)), tAngle);
    //radioWaves(this.h, random(.01,.5), random(.01,.5), random(15),8, tAngle);
    //radioWaves(100,.1,.3,10);

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

function radioWaves(rad, res, len, ring, style, angle){
var _radius = rad;
var resolution=res;
var lineLength = len;
var rings = ring;



//noStroke();
setColor();
noFill();
strokeWeight(1);

switch (style) {

  case 1:
  for(var i = 0; i < 360*angle*resolution; i++) {
    var radius = _radius;
    var x = cos(radians(i/resolution))*radius/rings;
    var y = sin(radians(i/resolution))*radius/rings;
    for(var j = 0; j < rings; j++) {
    beginShape();
    vertex(x*j,y*j);

    vertex(x*(j+lineLength),y*(j+lineLength));

    endShape();
    }

  }
    break;
    case 2:
    for(var i = 0; i < 360*angle*resolution; i++) {
      var radius = _radius;
      var x = cos(radians(i/resolution))*radius/rings;
      var y = sin(radians(i/resolution))*radius/rings;
      for(var j = 0; j < rings; j++) {
      beginShape();
      vertex(x*j,y*j);

      vertex(x*(j+lineLength/j),y*(j+lineLength/j));

      endShape();
      }

    }
      break;

      case 3:
      for(var i = 0; i < 360*angle*resolution; i++) {
        var radius = _radius;
        var x = cos(radians(i/resolution))*radius/rings;
        var y = sin(radians(i/resolution))*radius/rings;
        for(var j = 0; j < rings; j++) {
        beginShape();
        vertex(x*j,y*j);

        ellipse(x*j,y*j,j);

        endShape();
        }

      }
        break;
    case 4:
        for(var i = 0; i < 360*angle*resolution; i++) {
          var radius = _radius;
          var x = cos(radians(i/resolution))*radius/rings;
          var y = sin(radians(i/resolution))*radius/rings;
          for(var j = 0; j < rings; j++) {
          beginShape();
          vertex(x*j,y*j);

          ellipse(x*j,y*j,radius/rings/j);

          endShape();
          }

        }
          break;

//combo1
    case 5:
    for(var i = 0; i < 360*angle*resolution; i++) {
      var radius = _radius;
      var x = cos(radians(i/resolution))*radius/rings;
      var y = sin(radians(i/resolution))*radius/rings;
      for(var j = 0; j < rings; j++) {
      beginShape();
      vertex(x*j,y*j);
      if (Math.random() >= 0.25) {
        //equal size lines
      vertex(x*(j+lineLength),y*(j+lineLength));
    }
    else if (Math.random() >= 0.25) {
      //lines get smaller
      vertex(x*(j+lineLength/j),y*(j+lineLength/j));
    }
    else if (Math.random() >= 0.25) {
      ellipse(x*j,y*j,j);
    }
    else if (Math.random() >= 0.25) {
      ellipse(x*j,y*j,radius/rings/j);
    }
      endShape();
      }

    }
      break;

      //combo2
          case 6:
          for(var i = 0; i < 360*angle*resolution; i++) {
            var radius = _radius;
            var x = cos(radians(i/resolution))*radius/rings;
            var y = sin(radians(i/resolution))*radius/rings;
            for(var j = 0; j < rings; j++) {
            beginShape();
            vertex(x*j,y*j);
          if (Math.random() >= 0.25) {
              //equal size lines
            vertex(x*(j+lineLength),y*(j+lineLength));
          }
          else if (Math.random() >= 0.25) {
            //lines get smaller
            vertex(x*(j+lineLength/j),y*(j+lineLength/j));
          }
          else if (Math.random() >= 0.25) {
            push();
            setColor();
            noStroke();
            ellipse(x*j,y*j,j);
            pop();
          }
          else if (Math.random() >= 0.25) {
            push();
            setColor();
            noStroke();
            ellipse(x*j,y*j,radius/rings/j);
            pop();
          }
else {
  vertex(x*(j+lineLength),y*(j+lineLength));
}

            endShape();
            }

          }
            break;

            //combo3
                case 7:
                for(var i = 0; i < 360*angle*resolution; i++) {
                  var radius = _radius;
                  var x = cos(radians(i/resolution))*radius/rings;
                  var y = sin(radians(i/resolution))*radius/rings;
                  for(var j = 0; j < rings; j++) {
                  beginShape();
                  vertex(x*j,y*j);

                if (Math.random() >= 0.25) {
                    //equal size lines
                  vertex(x*(j+lineLength),y*(j+lineLength));
                }

                else if (Math.random() >= 0.25) {
                  push();
                  setColor();
                  if (Math.random() >= 0.5) {
                    noFill();
                  }
                  else{
                    noStroke();
                  }
                  ellipse(x*j,y*j,j);
                  pop();
                }
                else if (Math.random() >= 0.25) {
                  push();
                  setColor();
                  if (Math.random() >= 0.5) {
                    noFill();
                  }
                  else{
                    noStroke();
                  }
                  ellipse(x*j,y*j,radius/rings/j);
                  pop();
                }
                  endShape();
                  }

                }
                  break;


                  case 8:
                  var rot=random(360);
                  for(var i = 0; i < 360*angle*resolution; i++) {
                    var radius = random(_radius/4,_radius);
                    var x = cos(radians(i/resolution))*radius/rings;
                    var y = sin(radians(i/resolution))*radius/rings;
                    for(var j = 0; j < rings; j++) {

                    push();
                    beginShape();
                    //stroke(255,0,0);
                    vertex(x*j,y*j);
                    //do something here
                    vertex(x*(j+lineLength),y*(j+lineLength));
                    endShape();
                    pop();

                    }

                  }
                    break;


}
}

}
