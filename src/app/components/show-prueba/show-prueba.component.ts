import { Component, OnInit } from '@angular/core';
import { PruebaExperimento, User } from 'src/app/models/models';
import { Grid, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { PruebaService } from 'src/app/services/prueba.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-prueba',
  templateUrl: './show-prueba.component.html',
  styleUrls: ['../reports/reports.component.scss', './show-prueba.component.scss']
})
export class ShowPruebaComponent implements OnInit {

  user?: User
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  single: any[] = []
  vertical: any = []
  date = new Date()

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  reportForm = new FormGroup({
    periodo: new FormControl('Septiembre-Diciembre', [Validators.required]),
    ano: new FormControl(new Date().getFullYear(), [Validators.required]),
    grado: new FormControl('Primer Grado de Secundaria', [Validators.required]),
  })

  constructor(private pServ: PruebaService, private auth: AuthService, private uServ: UserService) {
    uServ.getById(<number>auth.userValue.id).subscribe(u => this.user = u)
  }

  grid: Grid = new Grid()
  data: PruebaExperimento[] = [];
  filterSettings: Object = { type: 'Menu' };

  ngOnInit(): void {

    let selected = (args: RowSelectEventArgs) => {
      let pe: PruebaExperimento = <PruebaExperimento>args.data
      window.location.href = `prueba/${pe.pruebaExperimentoId}/user/${pe.userId}`
    }

    this.pServ.getAll().subscribe(ps => {
      this.data = ps.data

      this.load(this.data, this.reportForm.controls.periodo.value, this.reportForm.controls.ano.value)
      this.loadV(this.reportForm.controls.grado.value)

      this.grid = this.auth.userValue.role != 'Estudiante' ? new Grid({
        dataSource: this.data
          .filter(e => this.auth.userValue.role == "Estudiante" ? (this.auth.userValue.id == e.userId) : true),
        selectionSettings: { type: 'Single' },
        columns: [
          { field: "titulo", headerText: "Titulo Prueba", width: 170 },
          { field: "user.name", headerText: "Nombre Estudiante", width: 80 },
          { field: "user.lastName1", headerText: "Apellido Paterno", width: 80 },
          { field: "user.lastName2", headerText: "Apellido Materno", width: 80 },
          // { field: "calificacionObtenidaReal", headerText: "Calificacion Obtenida", width: 60 },
          { field: "periodo", headerText: "Periodo Academico", width: 130 },
          { field: "user.grado", headerText: "Grado Academico", width: 80 },
          { field: "fechaTomado", type: 'date', format: 'dd/MM/yyyy', headerText: "Fecha Tomada", width: 80 },
        ],
        height: 315,
        rowSelected: selected,
        allowFiltering: true,
      })
        : new Grid({
          dataSource: this.data.filter(e => this.auth.userValue.role == "Estudiante" ? (this.auth.userValue.id == e.userId) : true),
          selectionSettings: { type: 'Single' },
          columns: [
            { field: "titulo", headerText: "Titulo Prueba", width: 200 },
            { field: "calificacionObtenidaReal", headerText: "Calificacion Obtenida", width: 60 },
            { field: "periodo", headerText: "Periodo Academico", width: 100 },
            { field: "fechaTomado", type: 'date', format: 'dd/MM/yyyy', headerText: "Fecha Tomada", width: 100 },
          ],
          height: 315,
          rowSelected: selected,
          allowFiltering: true,
        })

      this.grid.appendTo('#grid');
    })
  }

  load(d: PruebaExperimento[], periodo: string, ano: string) {
    // this.vertical =[{"name": "Jhonny Alcantara","value": 2},{"name": "Eleonor Delgado Pimentel","value": 0},{"name": "Ester Reyna ","value": 2}]
    
    let califPri = 0
    let califSeg = 0
    let califTer = 0
    let count = 1

    let data = d.filter(r => ano == r.periodo?.substring(0, 4) && periodo == r.periodo?.substring(5, r.periodo.length))

    data.filter(f => f.user?.grado == 'Primer Grado de Secundaria')
      .forEach(r => {
        califPri += +r.calificacionObtenidaReal / count
        count++
      })
    let p = {
      "name": "Primer Grado de Secundaria",
      "value": califPri
    }

    count = 1
    data.filter(f => f.user?.grado == 'Segundo Grado de Secundaria')
      .forEach(r => {
        califSeg += +r.calificacionObtenidaReal / count
        count++
      })
    let s = {
      "name": "Segundo Grado de Secundaria",
      "value": califSeg
    }

    count = 1
    data.filter(f => f.user?.grado == 'Tercer Grado de Secundaria')
      .forEach(r => {
        califTer += +r.calificacionObtenidaReal / count
        count++
      })
    let t = {
      "name": "Tercer Grado de Secundaria",
      "value": califTer
    }

    this.single = [p, s, t]
  }

  loadV(grado: string) {
    this.vertical = []

    this.uServ.getAll().subscribe(us => {
      let ps = us.filter(fu => fu.grado == grado && fu.role == 'Estudiante')

      ps.forEach(pss => {
        this.pServ.getAllPruebasByUser(pss.userId).subscribe(p => {
          let prs = <PruebaExperimento[]>p.data
          let total = 0

          prs.forEach(prss => {
            total += +prss.calificacionObtenidaReal
          })
          this.vertical.push({"name": String(`${pss.name} ${pss.lastName1}`), "value": total })
          this.vertical = [...this.vertical];
        })
      })
    })
  }
}

