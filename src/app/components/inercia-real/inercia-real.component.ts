import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-inercia-real',
  templateUrl: './inercia-real.component.html',
  styleUrls: ['../dinamics/dinamics.component.scss', './inercia-real.component.scss']
})
export class InerciaRealComponent implements OnInit {

  constructor() { }

  canvas: any;
  stop: any;
  start: any;
  restart: any;
  isStopped: boolean = true;
  m1Input: number = 2.5;
  m2Input: number = 1;

  ngOnInit(): void {
    const sketch = (p: any) => {

      let interval: any;
      let t: number = 0;

      let g = 0.02;
      let m1 = this.m1Input;
      let m2 = this.m2Input;
      let v = 0;
      let x = 0;

      p.setup = () => {
        let cnvs = p.createCanvas(400, 600);
        cnvs.parent('cnvs')
        p.textSize(15);

      }

      p.draw = () => {

        p.background(255);
        v += getAccel();

        if (Math.abs(x) > 230) {
          v = 0;
          if (x > 0)
            x = 230;
          else
            x = -230;
        }

        x += v;

        p.fill(200);
        p.strokeWeight(5);
        p.ellipse(200, 50, 150, 50);

        p.fill(0);

        p.text("M1 = " + m1 + " kg", 15, 50);
        p.text("M2 = " + m2 + " kg", 15, 80);
        p.text("Tiempo = " + t + "s", 15, 110)

        p.push();
        p.translate(115, 300 + x);
        p.rotate(-Math.PI / 2);
        var KE = Math.round(0.5 * m1 * v * v);
        var PE = Math.round(m1 * g * (230 - x));
        if (Math.abs(x) >= 230) {
          KE = 0;
        }
        if (x >= 230)
          PE = 0;

        p.stroke(0);
        p.strokeWeight(1);
        p.text("KE = " + KE + " J", -65, 50);
        p.text("PE = " + PE + " J", -70, 80);
        p.pop();

        p.line(125, 50, 125, x + 320);
        p.line(275, 50, 275, 320 - x);

        p.strokeWeight(1);

        p.fill(50);
        p.rect(100, 320 + x, 50);
        p.rect(250, 320 - x, 50);

        p.push();
        p.fill(255);
        p.text("M1", 120, 350 + x);
        p.text("M2", 270, 350 - x);
        p.pop();

        function getAccel() {
          return (m1 * g - m2 * g) / (m1 + m2);
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
        g = 0.02;
        m1 = this.m1Input;
        m2 = this.m2Input;
        v = 0;
        x = 0;
        t = 0
        p.loop();
        this.stop();
      };
    }
    this.canvas = new p5(sketch);
  }

}
