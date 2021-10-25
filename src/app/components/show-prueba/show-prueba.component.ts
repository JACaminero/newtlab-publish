import { Component, OnInit } from '@angular/core';
import { PruebaExperimento } from 'src/app/models/models';
import { Grid, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { PruebaService } from 'src/app/services/prueba.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-prueba',
  templateUrl: './show-prueba.component.html',
  styleUrls: ['../reports/reports.component.scss', './show-prueba.component.scss']
})
export class ShowPruebaComponent implements OnInit {

  constructor(private pServ: PruebaService, private auth: AuthService) { }

  grid: Grid = new Grid()
  data: PruebaExperimento[] = [];
  filterSettings: Object = { type: 'Menu' };

  ngOnInit(): void {

    let selected = (args: RowSelectEventArgs) => {
      let pe: PruebaExperimento = <PruebaExperimento>args.data 
      window.location.href = `prueba/${pe.pruebaExperimentoId}/user/${pe.userId}`
    }
    console.log(this.auth.userValue);
    
    this.pServ.getAll().subscribe(ps => {
      this.data = ps.data
  
      this.grid = new Grid({
        dataSource: this.data.filter(e => this.auth.userValue.role == "Estudiante" ? (this.auth.userValue.id == e.userId) : true),
        selectionSettings: { type: 'Single' },
        columns: [
          { field: "titulo", headerText: "Titulo Prueba", width: 200 },
          { field: "user.name", headerText: "Nombre Estudiante", width: 100 },
          { field: "user.lastName1", headerText: "Apellido Paterno", width: 100 },
          { field: "user.lastName2", headerText: "Apellido Materno", width: 100 },
          { field: "user.grado", headerText: "Grado Academico", width: 100 },
          { field: "fechaTomado", type:'date', format:'dd/MM/yyyy', headerText: "Fecha Tomada", width: 100 },
        ],
        height: 315,
        rowSelected: selected,
        allowFiltering: true,
      });
      this.grid.appendTo('#grid');
    })
}
}

