import { Component, OnInit, Inject } from '@angular/core';
import { Grid, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl('')
  })
  grid: Grid = new Grid()
  date: any
  data: any[] = [];
  filterSettings: Object = { type: 'Menu' };
  user?: any;
  constructor(public dialog: MatDialog, public pServ: PruebaService, private uServ: UserService, private auth: AuthService) {
    this.user = this.auth.userValue;
    this.date = this.reportForm.controls.fechaFin.value
  }

  ngOnInit() {   
    let selected = (args: RowSelectEventArgs) => {
      this.openDialog(args.data);
    }

    this.uServ.getAll().subscribe(u => {
      u.filter(us => us.role == 'Estudiante')
        .forEach(user => {
          this.data.push({
            name: `${user.name} ${user.lastName1} ${user.lastName2}`,
            email: `${user.username}`,
            userId: user.userId,
          })
        })

      if ('Estudiante' == this.user?.role) {
        this.data = []

        this.data.push(
          u.filter(dim => dim.userId == this.user?.id)
            .forEach(user => {
              this.data.push({
                name: `${user.name} ${user.lastName1} ${user.lastName2}`,
                email: `${user.username}`,
                userId: user.userId,
              })
            }))
        this.grid = new Grid({
          dataSource: this.data,
          selectionSettings: { type: 'Single' },
          columns: [
            { field: "name", headerText: "Nombre", width: 200 },
            { field: "email", headerText: "E-mail", width: 300 },
          ],
          height: 315,
          rowSelected: selected,
          allowFiltering: true,
        });
        this.grid.appendTo('#grid');
      }
      
      this.grid = new Grid({
        dataSource: this.data,
        selectionSettings: { type: 'Single' },
        columns: [
          { field: "name", headerText: "Nombre", width: 200 },
          { field: "email", headerText: "E-mail", width: 300 },
        ],
        height: 315,
        rowSelected: selected,
        allowFiltering: true,
      });
      this.grid.appendTo('#grid');
    })
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(ReportDialog, {
      width: '800px',
      data: data
    });
  }

}

@Component({
  selector: 'report-dialog',
  templateUrl: './report-dialog.html',
})
export class ReportDialog {

  pruebas?: Array<any>
  constructor(public dialogRef: MatDialogRef<ReportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public pServ: PruebaService) {

    pServ.getAllPruebasByUser(data.userId).subscribe(pe => {
      this.pruebas = pe.data
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}