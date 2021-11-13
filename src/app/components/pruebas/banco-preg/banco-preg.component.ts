import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BancoPreg, History, Pregunta, PruebaExperimento, Respuesta, User } from 'src/app/models/models';
import { BancoPregService, PublicarVM } from 'src/app/services/banco-preg.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill'
import { AuthService } from 'src/app/services/auth.service';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-banco-preg',
  templateUrl: './banco-preg.component.html',
  styleUrls: ['./banco-preg.component.scss',
    '../../banco-preg-show/banco-preg-show.component.scss']
})
export class BancoPregComponent implements OnInit {

  bp: BancoPreg = new BancoPreg()
  id: unknown
  ps?: Array<Pregunta>
  date: any
  califTotal: number = 0
  user?: any

  pruebaForm = new FormGroup({
    limit: new FormControl('', [Validators.required]),
    tituloPublic: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    instruccion: new FormControl('', [Validators.required]),
  })

  questionForm = new FormGroup({
    description: new FormControl('', [Validators.maxLength(120), Validators.required]),
    punt: new FormControl(0, [Validators.required]),
    answer1: new FormControl('', [Validators.maxLength(50), Validators.required]),
    answer2: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    answer3: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    answer4: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    selectedType: new FormControl('Seleccion Multiple'),
    options: new FormControl('1'),
  });


  constructor(private auth: AuthService, private route: ActivatedRoute
    , public dialog: MatDialog, private bpService: BancoPregService, private pServ: PruebaService) {
    this.auth.user.subscribe(x => this.user = x);
  }
  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')

    this.bpService.getById(<number>this.id).subscribe(u => {
      this.bp = u
      this.pruebaForm.controls.instruccion.setValue(this.bp.instruccion)
      this.pruebaForm.controls.descripcion.setValue(this.bp.descripcion)
    });

    this.bpService.getPreg(<number>this.id).subscribe(p => {
      this.ps = p
      this.ps.forEach(preg => {
        if (preg.isOn) {
          this.califTotal += +<number>preg.puntuacion
        }
      })
      this.ps.sort()
    })
    this.date = new Date().toISOString().slice(0, 10);
  }

  onSubmit() {
    if (this.bp.publicado) {
      alert('No puede modificar un banco de preguntas mientras esta publicado.')
      return
    }
    if (this.questionForm.controls.punt.value < 0) {
      alert('Debe asignar una puntuacion a esta pregunta.')
      return
    }

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
        alert("Necesita escoger una respuesta correcta");
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

    this.bpService.insertPreg(p).subscribe(() => {

      let h = new History()
      h.username = `El usuario ${this.auth.userValue.username}, con cedula: ${this.auth.userValue.cedula}`
      h.what = `Ha insertado una pregunta con titulo ${p.descripcion} al banco de preguntas: ${this.bp.tema}`
      this.bpService.insertHist(h).subscribe()

      window.location.reload()
    });
  }

  delete(id?: number) {
    if (this.bp.publicado) {
      alert('No puede modificar un banco de preguntas mientras esta publicado')
      return
    }

    let h = new History()
    h.username = `El usuario ${this.auth.userValue.username}, con cedula: ${this.auth.userValue.cedula}`
    h.what = `Ha deshabilitado una pregunta en el banco de preguntas: ${this.bp.tema}`
    this.bpService.insertHist(h).subscribe()

    this.bpService.deletePregunta(id).subscribe(() => window.location.reload())
  }

  openDialog(preguntaId?: any) {
    this.bpService.getResp(preguntaId).subscribe(rs => {
      this.dialog.open(RespuestaDialog, {
        width: '473px',
        data: { rs: rs }
      })
    })
  }

  deshabilitar(id?: number) {
    this.bpService.deshabilitar(id).subscribe(() => {
      window.location.reload()

      let h = new History()
      h.username = `El usuario ${this.auth.userValue.username}, con cedula: ${this.auth.userValue.cedula}`
      h.what = `Ha deshabilitado el banco de preguntas: ${this.bp.tema}`
      this.bpService.insertHist(h).subscribe()
    })
  }

  on(id?: number) {
    if (this.bp.publicado) {
      alert('No puede modificar un banco de preguntas mientras esta publicado')
      return
    }

    this.bpService.habilitarPregunta(id).subscribe(() => {
    
      let h = new History()
      h.username = `El usuario ${this.auth.userValue.username}, con cedula: ${this.auth.userValue.cedula}`
      h.what = `Ha habilitado una pregunta en el banco de preguntas: ${this.bp.tema}`
      this.bpService.insertHist(h).subscribe()
      
      window.location.reload()
    })
  }

  publicar(id?: number) {
    if (this.ps!.length <= 0) {
      alert('No puede publicar un banco de preguntas sin tener preguntas adentro.')
      return;
    }

    this.pServ.getAll().subscribe(prueb => {
      let pruebas: PruebaExperimento[] = prueb.data

      pruebas.forEach(e => {
        if (e.titulo?.trim() == this.pruebaForm.controls.tituloPublic.value) {
          alert("Ya existe una prueba con este titulo. Por favor escoja un titulo de prueba diferente")
        }
      })
      let limit = new PublicarVM()
      limit.limit = this.pruebaForm.controls.limit.value;
      limit.instruccion = <string>this.pruebaForm.controls.instruccion.value;
      limit.descripcion = <string>this.pruebaForm.controls.descripcion.value;

      this.bpService.publicar(id, limit, this.pruebaForm.controls.tituloPublic.value)
        .subscribe(() => {

          let h = new History()
          h.username = `El usuario ${this.auth.userValue.username}, con cedula: ${this.auth.userValue.cedula}`
          h.what = `Ha publicado el banco de preguntas: ${this.bp.tema}`
          this.bpService.insertHist(h).subscribe()

          window.location.reload()
        })
    })
  }

  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
      ['formula']
    ],
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
