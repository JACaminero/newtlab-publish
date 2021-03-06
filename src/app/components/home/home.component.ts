import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PruebaExperimento, Pregunta, PruebaRespuesta, User, Respuesta, BancoPreg, History } from 'src/app/models/models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PruebaService } from 'src/app/services/prueba.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user?: User;
  preguntas?: Pregunta[];
  id: unknown
  prueba: PruebaExperimento = new PruebaExperimento()
  respondidas: PruebaRespuesta[] = [];
  pruebaForm = new FormGroup({})
  bp?: BancoPreg
  califTotal: number = 0
  descr?: SafeHtml
  instr?: SafeHtml
  exper?: any

  constructor(
    private auth: AuthService, uServ: UserService, private route: ActivatedRoute,
    private fb: FormBuilder, private sanitizer: DomSanitizer,
    private bpService: BancoPregService, private pService: PruebaService, public dialog: MatDialog
  ) {
     uServ.getById(this.auth.userValue.id!).subscribe(u => {
      this.user = u
      this.id = this.route.snapshot.paramMap.get('id')
      this.exper = this.route.snapshot.paramMap.get('experimento')
  
      bpService.getById(<number>this.id).subscribe(b => {
        this.bp = b
        this.descr = this.sanitizer.bypassSecurityTrustHtml(<string>b.descripcion)
        this.instr = this.sanitizer.bypassSecurityTrustHtml(<string>b.instruccion)
      })

      bpService.getPreg(<number>this.id).subscribe(here => {
  
        this.preguntas = here.filter(r => r.isOn == true);
        this.preguntas.forEach(preg => {
          if (preg.isOn) {
            this.califTotal += +<number>preg.puntuacion
          }
        })
  
        this.preguntas.forEach(p => {
          this.bpService.getResp(p.preguntaId).subscribe(r => {
            p.respuestas = r
            p.respuestas.forEach(
              control => this.pruebaForm.addControl(<string>control.descripcion, this.fb.control(control.respuestaId)));
          })
        })
      })
    });
    
  }

  ngOnInit(): void { }

  radioChange(r: Respuesta) {
    let respondida = new PruebaRespuesta()
    respondida.preguntaId = r.respuestaId
    respondida.preguntaId = r.preguntaId

    for (let i = 0; i < this.respondidas.length; i++) {
      if (this.respondidas[i].preguntaId === r.preguntaId) {
        this.respondidas.splice(i, 1)
      }
    }
    this.respondidas.push(r)
  }

  openDialog() {
    this.prueba.bancoPreguntaId = <number>this.id
    this.prueba.userId = Object.values(this.auth.userValue)[0]
    this.prueba.calificacionTotal = this.bp?.califTotalPublicado

    this.pService.uploadTest(this.prueba, this.respondidas).subscribe(() => {

      this.dialog.open(SendTestDialog, {
        width: '473px',
        data: {
          message: this.pruebaForm.valid ?
            'Prueba enviada exitosamente' : 'Ha ocurrido un error, por favor revise la validez de sus respuestas'
        }
      });

      let h = new History()
      h.username = `El estudiante ${this.auth.userValue.username}, con matricula ${this.auth.userValue.matricula}`
      h.what = `Ha completado una prueba con titulo: ${this.bp?.tituloPublicado}`
      this.bpService.insertHist(h).subscribe()
      
      window.location.reload()
    })
  }
}


@Component({
  selector: 'send-test-dialog',
  templateUrl: './send-test.html',
})
export class SendTestDialog {

  constructor(
    public dialogRef: MatDialogRef<SendTestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
