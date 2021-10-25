import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-inercia',
  templateUrl: './inercia.component.html',
  styleUrls: ['../dinamics/dinamics.component.scss', './inercia.component.scss']
})
export class InerciaComponent implements OnInit {

  constructor() { }

  canvas: any;
  v1Input: number = 2;
  v2Input: number = -2;
  m1Input: number = 5;
  m2Input: number = 5;

  timer: number = 0;
  speed: number = 0
  //  functions to manipulate experiment's of execution 
  stop: any;
  start: any;
  restart: any;
  isStopped: boolean = true;

  ngOnInit(): void {
    const sketch = (p: any) => {
      let block1: Block;
      let block2: Block;
      let interval: any;
      const timeSteps = 1000;
      let t: number = 0;

      let v1 = 2 / timeSteps;
      let v2 = -2 / timeSteps;
      let m1 = 5;
      let m2 = 5;
      let type = "perfectly elastic";

      p.setup = () => {
        let cnvs = p.createCanvas(800, 450);
        cnvs.parent('cnvs');
        p.textSize(20);
        block1 = new Block(200, 100, 5, 2 / timeSteps, 0, 151, 127, 215);
        block2 = new Block(500, 100, 5, -2 / timeSteps, 0, 156, 207, 231);
      }

      p.draw = () => {
        p.noStroke();
        p.fill(0);
        p.background(255);
        this.timer = t;

        
        p.stroke(0);
        p.fill(151, 127, 215);
        // p.rect(100, 5, 110, 5);
        p.text("Bloque 1", 100, 20)
        
        p.stroke(0);
        p.fill(156, 207, 231);
        // p.rect(100, 35, 10, 10);
        p.text("Bloque 2", 100, 45);
       
        p.fill(0, 0, 0);
        p.text("V1  = " + p.round(block1.v * 100000) / 100 + " m/s", 100, 75)
        p.text("V2  = " + p.round(block2.v * 100000) / 100 + " m/s", 100, 105)
        p.text("TiempoTranscurrido = " + t + "s", 100, 135)

        for (let i = 0; i < timeSteps; i++) {

          if (block1.collide(block2)) {
            if (type == "perfectly elastic") {
              const v1 = block1.bounce(block2);
              const v2 = block2.bounce(block1);
              block1.v = v1;
              block2.v = v2;
            } else if (type == "perfectly inelastic") {
              var vf = (block1.m * block1.v + block2.m * block2.v) / (block1.m + block2.m);
              block1.v = vf;
              block2.v = vf;
            }
          }

          if (block1.hitWall()) {
            if (type == "perfectly inelastic" && block1.v === block2.v && block1.collide(block2)) {
              block2.reverse();
            }
            block1.reverse();
          }
          if (block2.hitWall()) {
            if (type == "perfectly inelastic" && block1.v === block2.v && block1.collide(block2)) {
              block1.reverse();
            }
            block2.reverse();
          }

          block1.update();
          block2.update();
        }


        p.stroke(0);
        p.fill(block1.r, block1.g, block1.b);
        const x = p.constrain(block1.x, block1.xConstraint, block1.width)
        p.rect(x, block1.y, block1.w, block1.w);

        p.stroke(0);
        p.fill(block2.r, block2.g, block2.b);
        const y = p.constrain(block2.x, block2.xConstraint, block2.width)
        p.rect(y, block2.y, block2.w, block2.w);


        if (v1 != this.v1Input / timeSteps) {
          block1.v = this.v1Input / timeSteps;
          v1 = this.v1Input / timeSteps;
        }
        if (v2 != this.v2Input / timeSteps) {
          block2.v = this.v2Input / timeSteps;
          v2 = this.v2Input / timeSteps;
        }
        if (m1 != this.m1Input) {
          block1.m = this.m1Input;
          m1 = this.m1Input;
        }
        if (m2 != this.m2Input) {
          block2.m = this.m2Input;
          m2 = this.m1Input;
        }
      }

      function increaseTime() {
        t = t + 1;
      }

      p.noLoop();

      this.start = () => {
        p.loop();
        if (!interval) {
          interval = setInterval(increaseTime, 1000);
        }
      }

      this.stop = () => {
        p.noLoop();
        clearInterval(interval);
        interval = null;
      };

      this.restart = () => {
        block1 = new Block(200, 100, 5, 2 / timeSteps, 0, 151, 127, 215);
        block2 = new Block(500, 100, 5, -2 / timeSteps, 0, 156, 207, 231);
        t = 0;
        v1 = 2 / timeSteps;
        v2 = -2 / timeSteps;
        m1 = 5;
        m2 = 5;
        type = "perfectly elastic";
        p.loop();
        this.stop();
      };
    }
    this.canvas = new p5(sketch);

  }

}

export class Block {
  x: number = 0
  y: number = 0
  w: number = 0
  m: number = 0
  v: number = 0
  xConstraint: number = 0
  r: number = 0
  g: number = 0
  b: number = 0
  height = 450
  width = 800
  constructor(x: number, w: number, m: number, v: number, xC: number, r: number, g: number, b: number) {
    this.x = x;
    this.y = this.height - w;
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConstraint = xC;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  hitWall() {
    return this.x <= 0 || this.x + this.w >= this.width;
  }

  reverse() {
    this.v *= -1;
  }

  collide(other: Block) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }

  bounce(other: Block) {
    let sumM = this.m + other.m;
    let newV = (this.m - other.m) / sumM * this.v;
    newV += 2 * other.m / sumM * other.v;
    return newV;
  }

  update() {
    this.x += this.v;
  }

  show(p: any) {
    p.stroke(0);
    p.fill(this.r, this.g, this.b);
    const x = p.constrain(this.x, this.xConstraint, this.width)
    p.rect(x, this.y, this.w, this.w);
  }
}