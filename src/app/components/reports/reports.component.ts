import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Grid, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PruebaService } from 'src/app/services/prueba.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { PruebaExperimento } from 'src/app/models/models';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportForm = new FormGroup({
    periodo: new FormControl('Septiembre-Diciembre', [Validators.required]),
    ano: new FormControl(new Date().getFullYear(), [Validators.required])
  })
  grid: Grid = new Grid()
  date: any
  data: any[] = [];
  filterSettings: Object = { type: 'Menu' };
  user?: any;

  constructor(public dialog: MatDialog, public pServ: PruebaService, private uServ: UserService, private auth: AuthService) {
    this.user = this.auth.userValue;
    this.date = new Date().getFullYear()
  }

  ngOnInit() {
    let selected = (args: RowSelectEventArgs) => {
      this.openDialog(args.data);
    }
    this.uServ.getAll().subscribe(u => {
      u.filter(us => this.user?.role == 'Estudiante' ? us.userId == this.user?.id : us.role == 'Estudiante')
        .forEach(user => {
          this.data.push({
            name: `${user.name} ${user.lastName1} ${user.lastName2}`,
            email: `${user.username}`,
            userId: user.userId,
            calificacion: 0,
            periodo: this.reportForm.controls.periodo.value,
            matricula: user.matricula,
            grado: user.grado
          })
          this.pServ.getAllPruebasByUser(user.userId).subscribe(c => {
            let pe = <PruebaExperimento[]>c.data
            pe.forEach(e => {
              for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].userId == e.userId) {
                  this.data[i].calificacion += +e.calificacionObtenida!
                }
              }
            });
          })
        })

      setTimeout(() => {            
        this.grid = new Grid({
          dataSource: this.data,
          selectionSettings: { type: 'Single' },
          columns: [
            { field: "name", headerText: "Nombre", width: 200 },
            { field: "email", headerText: "E-mail", width: 300 },
            { field: "grado", headerText: "Grado", width: 300 },
            { field: "calificacion", headerText: "Calificacion Acumulada en periodo", width: 300 },
          ],
          height: 315,
          rowSelected: selected,
          allowFiltering: true,
        });
        this.grid.appendTo('#grid');

      }, 3000);
    })
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(ReportDialog, {
      width: '800px',
      data: data
    });
  }

  @ViewChild('pdfTable', { read: ElementRef }) pdfTable!: ElementRef;
  toPDF() {
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(this.pdfTable.nativeElement, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', true);

      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((doc) => {
      doc.save('ReporteCalificaciones.pdf');
    });
  }
}

@Component({
  selector: 'report-dialog',
  templateUrl: './report-dialog.html',
})
export class ReportDialog {

  pruebas: Array<any> = []
  constructor(public dialogRef: MatDialogRef<ReportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public pServ: PruebaService) {

    pServ.getAllPruebasByUser(data.userId).subscribe(pe => {
      this.pruebas = pe.data
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  @ViewChild('pdfTable', { read: ElementRef }) pdfTable!: ElementRef;
  toPDF() {
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(this.pdfTable.nativeElement, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', true);

      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save(`${this.data.matricula}-${this.data.birth}${this.data.periodo}.pdf`);
    });
  }
}