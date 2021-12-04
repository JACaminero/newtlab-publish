import { Component, OnInit } from '@angular/core';
import { PruebaExperimento, User } from 'src/app/models/models';
import { Grid, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { PruebaService } from 'src/app/services/prueba.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-prueba',
  templateUrl: './show-prueba.component.html',
  styleUrls: ['../reports/reports.component.scss', './show-prueba.component.scss']
})
export class ShowPruebaComponent implements OnInit {

  user?: User
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
      console.log(this.data);
            
      this.grid = this.auth.userValue.role != 'Estudiante' ? new Grid({
        dataSource: this.data.filter(e => this.auth.userValue.role == "Estudiante" ? (this.auth.userValue.id == e.userId) : true),
        selectionSettings: { type: 'Single' },
        columns: [
          { field: "titulo", headerText: "Titulo Prueba", width: 200 },
          { field: "user.name", headerText: "Nombre Estudiante", width: 100 },
          { field: "user.lastName1", headerText: "Apellido Paterno", width: 100 },
          { field: "user.lastName2", headerText: "Apellido Materno", width: 100 },
          { field: "calificacionObtenidaReal", headerText: "Calificacion Obtenida", width: 60 },
          { field: "periodo", headerText: "Periodo Academico", width: 100 },
          { field: "user.grado", headerText: "Grado Academico Estudiante", width: 100 },
          { field: "fechaTomado", type:'date', format:'dd/MM/yyyy', headerText: "Fecha Tomada", width: 100 },
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
          { field: "fechaTomado", type:'date', format:'dd/MM/yyyy', headerText: "Fecha Tomada", width: 100 },
        ],
        height: 315,
        rowSelected: selected,
        allowFiltering: true,
      })
      
      this.grid.appendTo('#grid');
    })
}
}

