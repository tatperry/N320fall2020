// Tatiana Perry
// N320 FA 20
// Group Rain - Aissignment 1
// 29 August 2020

// Variables
// rain/ background/ ground
var rain = [];
var rainingNow = true;
var bgcolor = (134, 162, 255, 100);

// setting up canvas
function setup() {
  createCanvas(600, 600);
  //frameRate(60);
  // falling rain at randome speeds
  for (i = 0; i < 100; i++) {
    rain[i] = new Rain(random(50, 550), random(0, -3000));
  }
}
// setting up the background with the ground
function draw() {
  background(bgcolor);
  ground();
  //Rain();
  //console.log(mouseX, mouseY);

  //Check if it's raining
  if (rainingNow == true) {
    //background(100);
    for (i = 0; i < rain.length; i++) {
      rain[i].dropRain();
      rain[i].splash();
    }
  } else {
    drawSun();
    //background(160,209,230);
  }
}

function ground() {
  //noStroke();
  fill(170, 150, 146, 240);
  rect(0, 530, 600, 530);
}
// rain drops size & speed of the rain drops on screen
function Rain(x, y) {
  this.x = x;
  this.y = y;
  //this.gravity = 9.8;
  this.length = 15;
  this.r = 0;
  this.opacity = 200;
  // size of the rain drops
  this.dropRain = function () {
    noStroke();
    fill(208, 245, 244);
    //rect(this.x, this.y,3,15);
    ellipse(this.x, this.y, 3, this.length);
    this.y = this.y + 6; //+ frameCount/60;
    if (this.y > 540) {
      this.length = this.length - 5;
      //this.y= random(0,-100);
    }
    if (this.length < 0) {
      this.length = 0;
    }
  };
  // Rain drops going to a "splash" effect/ cutting everything down to a different shape
  this.splash = function () {
    strokeWeight(2);
    //stroke(245, 200/frameCount);
    stroke(245, this.opacity);
    noFill();
    if (this.y > 540) {
      ellipse(this.x, 550, this.r * 2, this.r / 2);
      this.r++;
      this.opacity = this.opacity - 10;

      //keep the rain dropping
      if (this.opacity < 0) {
        this.y = random(0, -100);
        this.length = 15;
        this.r = 0;
        this.opacity = 200;
      }
    }
  };
}
