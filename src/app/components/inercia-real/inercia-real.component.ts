import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-inercia-real',
  templateUrl: './inercia-real.component.html',
  styleUrls: ['./inercia-real.component.scss']
})
export class InerciaRealComponent implements OnInit {

  constructor() { }

  canvas: any;
  stop: any;
  start: any;
  restart: any;
  isStopped: boolean = true;

  ngOnInit(): void {
    let interval: any;
    let t: number = 0;

    const sketch = (p: any) => {
      p.setup = () => {
      
        let cnvs = p.createCanvas(800, 450);
        cnvs.parent('cnvs');
      }

      p.draw = () => {
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
        // block1 = new Block(200, 100, 5, 2 / timeSteps, 0, 151, 127, 215);
        // block2 = new Block(500, 100, 5, -2 / timeSteps, 0, 156, 207, 231);
        // t = 0;
        // v1 = 2 / timeSteps;
        // v2 = -2 / timeSteps;
        // m1 = 5;
        // m2 = 5;
        // type = "perfectly elastic";
        p.loop();
        this.stop();
      };
      this.canvas = new p5(sketch);
    }
  }

}
