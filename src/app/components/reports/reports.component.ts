import { Component, OnInit, Inject } from '@angular/core';
import { Grid, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public data: Object[] = [];
  public filterSettings: Object = { type: 'Menu' };
  user?: User;
  constructor(public dialog: MatDialog, private auth: AuthService) {
    this.user = this.auth.userValue;
  }

  ngOnInit() {
    this.data = [
      { Matricula: 'mr2021', Nombre: 'Melisa de la Rosa', NotaAcumulada: "32 puntos" },
    ];

    let selected = (args: RowSelectEventArgs) => {
      this.openDialog({});
    }

    let grid: Grid = new Grid({
      dataSource: this.data,
      selectionSettings: { type: 'Single' },
      columns: [
        {
          field: "Matricula",
          headerText: "Matricula",
          width: 120
        },
        { field: "Nombre", headerText: "Nombre", width: 200 },
        {
          field: "NotaAcumulada",
          headerText: "Nota Acumulada",
          textAlign: "Right",
          width: 120
        },
      ],
      height: 315,
      rowSelected: selected
    });
    grid.appendTo('#grid');

  }

  openDialog(grades: any) {
    const dialogRef = this.dialog.open(ReportDialog, {
      width: '473px',
      data: { name: 'this.name', animal: 'this.animal' }
    });
  }
}

@Component({
  selector: 'report-dialog',
  templateUrl: './report-dialog.html',
})
export class ReportDialog {

  constructor(
    public dialogRef: MatDialogRef<ReportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}