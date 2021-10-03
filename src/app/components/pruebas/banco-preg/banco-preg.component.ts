import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BancoPreg, Pregunta, Respuesta } from 'src/app/models/models';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-banco-preg',
  templateUrl: './banco-preg.component.html',
  styleUrls: ['./banco-preg.component.scss',
    '../../banco-preg-show/banco-preg-show.component.scss']
})
export class BancoPregComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private bpService: BancoPregService) { }
  bp: BancoPreg = new BancoPreg()
  id: unknown
  ps?: Array<Pregunta>

  questionForm = new FormGroup({
    description: new FormControl('', [Validators.maxLength(120), Validators.required]),
    punt: new FormControl(1, [Validators.required]),
    answer1: new FormControl('', [Validators.maxLength(50), Validators.required]),
    answer2: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    answer3: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    answer4: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    selectedType: new FormControl('Seleccion Multiple'),
    options: new FormControl('1')
  });


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.bpService.getById(<number>this.id).subscribe(u => {
      this.bp = u
    });
    this.bpService.getPreg(<number>this.id).subscribe(p => {
      this.ps = p
    })
  }

  onSubmit() {
    let error: Array<string> = []
    let a1 = new Respuesta(this.questionForm.controls.answer1.value)
    let a2 = new Respuesta(this.questionForm.controls.answer2.value)
    let a3 = new Respuesta(this.questionForm.controls.answer3.value)
    let a4 = new Respuesta(this.questionForm.controls.answer4.value)

    switch (this.questionForm.controls.options.value) {
      case "1": a1.esCorrecta = true
        break;
      case "2": a2.esCorrecta = true
        break;
      case "3": a3.esCorrecta = true
        break;
      case "4": a4.esCorrecta = true
        break;
      default:
        error.push("Necesita escoger una respuesta correcta")
        break;
    }

    let rs = new Array<Respuesta>()
    rs.push(a1, a2, a3, a4);

    let p = new Pregunta()
    p.descripcion = this.questionForm.controls.description.value;
    p.puntuacion = this.questionForm.controls.punt.value;    
    p.respuestas = rs;
    
    p.bancoPreguntaId = <number>this.id
    p.tp = this.questionForm.controls.selectedType.value

    this.bpService.insertPreg(p).subscribe();
    window.location.reload()
  }

  delete(id?: number) {
    this.bpService.deletePregunta(id).subscribe()
    window.location.reload()
  }
  openDialog(preguntaId: any) {
    this.bpService.getResp(preguntaId).subscribe(rs => {
      
      this.dialog.open(RespuestaDialog, {
        width: '473px',
        data: { rs: rs }
      })
    })
  }
}

@Component({
  selector: 'repuesta-dialog',
  templateUrl: './repuesta-dialog.html',
})
export class RespuestaDialog {

  constructor(
    public dialogRef: MatDialogRef<RespuestaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}