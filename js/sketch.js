var s;
var scl = 40;
var score = 0; //score starts at 0
var food;
var leaf;
let button;
    
function setup() {
  
  createCanvas(1200, 1200);
  button = createButton('Double Click to Start'); // creates the button
  button.position(width/2+50,0); 
  button.size(1300, 1210) // sets height to the size of your canvas
button.style("font-size"," 48pt ")
  s = new Snake();
  frameRate(10);
  pickLocation();

}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  ///////
  
  
 
  
  
  ///////
 background("brown");
  fill("orange");
 rectMode(CENTER)
  noStroke();
   rect (width/2,height/2,1160,1160)
 
  
  if (s.eat(food)) {
    pickLocation();
  score += 1;
  }
  
  s.death();
  s.update();
  s.show();


  fill("red");
  rect(food.x, food.y, scl, scl);

  
  
  fill("red");
  rect(20,20, scl, scl);
   rect (10,10 ,20,10)
 fill ("orange")
 text ("score " +score ,45,15)

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
function doubleClicked() { button.hide(); } //hides the element if it's double clicked

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
          score =0;
      }
    }
  }

  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {
    fill("Green");
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
    fill ("white")
rect(this.x,this.y,20,20)
    fill ("black")
rect(this.x,this.y,10,10)
    
  }
}
