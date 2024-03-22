let mover;
let attractor;
let G= 1.0;

function setup() {
  createCanvas(800, 600, WEBGL);
  translate();
  debugMode();
   
  mover = new Mover(1, 10, 10, 2, 0);
  mover2 = new Mover(2, 5, 2, 0.01, 0);
  mover3= new Mover( 1, 4, 6, 0.5 , 3)
  mover4= new Mover( 2, 6, 3, 0.7 , 0)
  attractor = new Attractor(); background(60, 60, 80);
}

function draw() {
  
  orbitControl();
  let force = attractor.attract(mover);
  let force2 = attractor.attract(mover2);
  let force3 = attractor.attract(mover3);
  mover.applyForce(force);
  mover2.applyForce(force2);
  mover3.applyForce(force3);
//Apply the attraction force from the attractor on the mover.

  mover.update();
  mover2.update();
  mover3.update();
  mover4.update();
  attractor.show();
  mover.show();
  mover2.show();
  mover3.show();
  mover4.show();
}

class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2, 0);
    this.mass = 50;
  }

  attract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
//Remember, you need to constrain the distance so your circle doesn’t spin out of control.

    let strength = (G * this.mass * mover.mass) / (distance * distance);
    force.setMag(strength);
    return force;
  }

  show() {
    stroke(0);
    fill(175, 200);
    //translate(this.position.x, this.position.y, 0);
    sphere(2*this.mass);

  }
}
class Mover {
  constructor(mass, pos_x, pos_y, vel_x, vel_y) {
    this.mass = mass;

    this.position = createVector(pos_x, pos_y, 0);
    this.velocity = createVector(vel_x, vel_y, 0);
    this.acceleration = createVector(0, 0, 0);
  }

  applyForce(force) {

    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);

  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);

  }

  show() {
    stroke(0);
    fill(175);
    push();
    translate(this.position.x, this.position.y,0)
    sphere( this.mass * 16);
    pop();
  }
}