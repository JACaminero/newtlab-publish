import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sesion } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['../banco-preg-show/banco-preg-show.component.scss', './sesion.component.scss']
})
export class SesionComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    grado: new FormControl('Primer Grado de Secundaria'),
  });

  constructor(private uServ: UserService) { }
  ssOriginal = new Array<Sesion>()
  ss = new Array<Sesion>()
  ngOnInit(): void {
    this.uServ.getSesion().subscribe(s => {
      this.ss = s
      this.ssOriginal = s
    })
  }

  filter() {
    this.ss = this.ssOriginal.filter(f => f.grado == this.form.controls.grado.value)
  }
  
  onSubmit() {
    if (this.form.invalid) {
      alert('Datos incorrectos reintente nuevamente')
    }
    let s = new Sesion()
    s.grado = this.form.controls.grado.value
    s.sesionNombre = this.form.controls.name.value
    s.isOn = true

    this.uServ.insertSesion(s).subscribe(() => { window.location.reload() })
  }


  delete(id?: number) {
    this.uServ.offSesion(id).subscribe(() => window.location.reload())
  }

  on(id?: number) {
    this.uServ.onSesion(id).subscribe(() => window.location.reload())
  }
}
