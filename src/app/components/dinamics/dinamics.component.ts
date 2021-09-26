import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-dinamics',
  templateUrl: 'dinamics.component.html',
  styleUrls: ['./dinamics.component.scss']
})

export class DinamicsComponent implements OnInit {

  constructor() { }
  canvas: any;

  p = p5.prototype;
  massInput: number = 60;
  angleInput: number = 15;
  fricInput: number = 0.2;
  timer: number = 0;
  speed: number = 0
  distance: number = 0;
  //  functions to manipulate experiment's of execution 
  stop: any;
  start: any;
  restart: any;
  isStopped: boolean = true;

  ngOnInit(): void {
    const sketch = (p: any) => {
      let weightSize, m: number, acc: number, weight = 0;
      const g = 9.8;
      let v: number = 0
      let interval: any;
      let x = 300;
      let ang = 15;
      let fric = 0.2;
      let t: number = 0;

      p.setup = () => {
        let cnvs = p.createCanvas(800, 450);
        cnvs.parent('cnvs');
        p.rectMode(p.CENTER);
      }

      function increaseTime() {
        t = t + 1;
      }

      p.draw = () => {
        p.background(255);
        this.timer = t;
        this.speed = Math.round(v);
        this.distance = Math.round(v * t);
        m = this.massInput;
        weight = m * g;
        weightSize = weight / 6;
        ang = toRadian(this.angleInput);
        fric = this.fricInput;
        p.fill(220);

        p.triangle(0, p.height - p.width * Math.tan(ang), 0, p.height, p.width, p.height);
        p.fill(150);

        p.push();
        p.translate(x, p.height - Math.tan(ang) * (p.width - x));
        p.rotate(ang);
        p.rect(0, -weightSize / 2, weightSize, weightSize);

        var base = p.createVector(0, -weightSize / 2);

        p.text("Fn", 7, (weightSize * Math.cos(ang) * -1) - 20);
        drawArrow(base, p.createVector(0, (weightSize * Math.cos(ang) * -1) + 30), 'black');

        p.text("Fgy", 0, weightSize * Math.cos(ang) - 30);
        drawArrow(base, p.createVector(0, weightSize * Math.cos(ang)), 'black');

        p.text("Fa + Fgx", weightSize * Math.sin(ang) + 40, -60);
        drawArrow(base, p.createVector(weightSize * Math.sin(ang) + 40, 0), 'black');

        p.fill(0);
        p.pop();

        acc = getAccel();
        v += acc / 60;
        if (acc === 0) {
          v = 0;
        }

        x += v / 5;

        if (x >= p.width) {
          x = 0;
          if (v >= 100) {
            v = 0;
          }
        }
      }

      function toRadian(degrees: number): number {
        return degrees * Math.PI / 180;
      }

      // Fa + Fgx - Fgy / m = acc we assume Fa is 0 and ignore friction
      function getAccel() {
        return (0 + weight * Math.sin(ang) - calcFric()) / m;
      }

      function calcFric() {
        if (Math.abs(weight * Math.sin(ang)) <= weight * Math.cos(ang) * fric) {
          return 0;
        }
        return weight * Math.cos(ang) * fric;
      }

      function drawArrow(base: any, vec: any, myColor: any) {
        p.push();
        p.stroke(myColor);
        p.strokeWeight(3);
        p.fill(myColor);
        p.translate(base.x, base.y);
        p.line(0, 0, vec.x, vec.y);
        p.rotate(vec.heading());
        let arrowSize = 7;
        p.translate(vec.mag() - arrowSize, 0);
        p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        p.pop();
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
        weight = 0;
        v = 0;
        x = 300;
        m = 10;
        ang = 15;
        fric = 0.2;
        t = 0;
        p.loop();
        this.stop();
      };
    }

    this.canvas = new p5(sketch);
  }
}
