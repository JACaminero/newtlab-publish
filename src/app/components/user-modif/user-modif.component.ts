import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Sesion, User } from 'src/app/models/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-modif',
  templateUrl: './user-modif.component.html',
  styleUrls: ['./user-modif.component.scss']
})
export class UserModifComponent implements OnInit {

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.maxLength(30), Validators.required]),
    lastName1: new FormControl('', [Validators.maxLength(30), Validators.required]),
    lastName2: new FormControl('', [Validators.maxLength(30), Validators.required]),
    birth: new FormControl(new Date(), [Validators.required]),
    cedula: new FormControl('', [
      Validators.required, Validators.pattern(/^[0-9]{3}-?[0-9]{7}-?[0-9]{1}$/),
      Validators.maxLength(11), Validators.minLength(11)
    ]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    grado: new FormControl(''),
    seccion: new FormControl('')
  });

  resetForm = new FormGroup({
    new: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    confirm: new FormControl('', [Validators.required, Validators.maxLength(12)]),
  });

  uss: User[] = []
  id: unknown
  emailOriginal = ''
  ses = new Array<Sesion>()
  sesOriginal = new Array<Sesion>()
  reestable?: boolean

  constructor(private uServ: UserService, private datePipe: DatePipe, private route: ActivatedRoute) {
    uServ.getAll().subscribe(us => this.uss = us)
  }

  filter() {
    this.ses = this.sesOriginal.filter(f => f.grado == this.userForm.controls.grado.value)
  }

  current: User = new User()
  date = new FormControl(new Date());

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')

    this.uServ.getById(<number>this.id).subscribe(u => {
      this.uServ.getSesion().subscribe(r => {
        this.ses = r.filter(f => f.grado == u.grado)
        this.sesOriginal = r
        this.emailOriginal = u.username
        
        this.date.setValue(new Date(u.birth!))
        this.userForm.controls.birth.setValue(u.birth)
        this.current = u;
        this.userForm.patchValue({
          firstName: this.current.name,
          lastName1: this.current.lastName1,
          lastName2: this.current.lastName2,
          cedula: this.current.cedula,
          phone: this.current.phone,
          email: this.current.username,
          grado: this.current.grado,
          seccion: this.current.seccion
        })

      })
      
    })
  }

  reestablece() {
    this.reestable = true;
  }
  modificar() {

    if (this.current.role == 'Estudiante') {
      this.userForm.controls.cedula.clearValidators();
      this.userForm.controls.cedula.updateValueAndValidity();
    }
    if (this.userForm.invalid) {
      alert('Han ocurrido problemas con la informacion ingresa')
      return;
    }
    console.log(this.userForm.controls.birth.value)

    this.current.name = this.userForm.controls.firstName.value;
    this.current.lastName1 = this.userForm.controls.lastName1.value;
    this.current.lastName2 = this.userForm.controls.lastName2.value;
    this.current.username = this.userForm.controls.email.value;
    this.current.cedula = this.userForm.controls.cedula.value;
    this.current.phone = this.userForm.controls.phone.value;
    this.current.birth = this.userForm.controls.birth.value == {} ? this.datePipe.transform(this.current.birth, "yyyy-MM-dd") : this.userForm.controls.birth.value;
    this.current.grado = this.userForm.controls.grado.value;
    this.current.seccion = this.userForm.controls.seccion.value;

    this.uss.forEach(us => {
      if (this.emailOriginal != this.current.username && us.username == this.current.username) {
        alert('Este E-mail ya esta registrado en el sistema.')
        return;
      }
    })

    this.uServ.modify(this.current).subscribe(resp => {
      alert(resp.message)
    })
  }

  resetPassword() {

    if (this.resetForm.controls.new.value != this.resetForm.controls.confirm.value) {
      alert('Las contraseñas no son iguales')
      return;
    }
    this.current.password = this.resetForm.controls.new.value

    this.uServ.modify(this.current).subscribe(resp => {
      alert('Operacion exitosa')
      window.location.reload()
    })
  }
}
