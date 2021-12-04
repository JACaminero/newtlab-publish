import { Component, OnInit } from '@angular/core';
import { Grid } from '@syncfusion/ej2-grids';
import { AuthService } from 'src/app/services/auth.service';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  grid: Grid = new Grid()
  data: any[] = [];
  filterSettings: Object = { type: 'Menu' };
  user?: any;

  constructor(public bServ: BancoPregService, private uServ: UserService, private auth: AuthService) {
    this.user = this.auth.userValue;
  }

  ngOnInit() {
    this.bServ.getHist().subscribe(h => {
      
      this.grid = new Grid({
        dataSource: h,
        selectionSettings: { type: 'Single' },
        columns: [
          { field: "username", headerText: "Usuario", width: 500 },
          { field: "what", headerText: "Accion", width: 400 },
          { field: "fecha", headerText: "Fecha", width: 100 },
        ],
        allowFiltering: true,
      });
      this.grid.appendTo('#grid');
    })
  }

}
