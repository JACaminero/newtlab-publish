import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-inercia-real',
  templateUrl: './inercia-real.component.html',
  styleUrls: ['../dinamics/dinamics.component.scss', './inercia-real.component.scss']
})
export class InerciaRealComponent implements OnInit {

  constructor() { }

  data?: any[];
  view: number[] = [700, 300];
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tiempo (segundos)';
  yAxisLabel: string = 'Valor';
  timeline: boolean = true;

  canvas: any;
  m1Input: number = 2.5;
  m2Input: number = 1;
  ke?: number
  pe?: number
  keData: any = { name: 'Energia Kinetica', series: [] }
  peData: any = { name: 'Energia Potencial', series: [] }

  stop: any;
  start: any;
  restart: any;
  isStopped: boolean = true;
  graph: any;

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
        this.ke = Math.round(0.5 * m1 * v * v);
        this.pe = Math.round(m1 * g * (230 - x));
        if (Math.abs(x) >= 230) {
          this.ke = 0;
          this.stop()
        }
        if (x >= 230) {
          this.pe = 0;
          this.stop()
        }

        p.stroke(0);
        p.strokeWeight(1);
        p.text("KE = " + this.ke + " J", -65, 50);
        p.text("PE = " + this.pe + " J", -70, 80);
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
          interval = setInterval(() => {
            increaseTime()
            this.keData.series.push({ name: t, value: this.ke })
            this.peData.series.push({ name: t, value: this.pe })

          }, 1000);
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
        
        this.peData.series = []
        this.keData.series = []
        this.data = []
      };
      
      this.graph = () => {
        this.data = [this.peData, this.keData]
      }
    }
    this.canvas = new p5(sketch);
  }

}
