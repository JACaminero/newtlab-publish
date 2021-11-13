import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { History, Sesion, User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { BancoPregService } from 'src/app/services/banco-preg.service';

@Component({
  selector: 'app-user-regist',
  templateUrl: './user-regist.component.html',
  styleUrls: ['./user-regist.component.scss']
})
export class UserRegistComponent {

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.maxLength(30), Validators.required]),
    lastName1: new FormControl('', [Validators.maxLength(30), Validators.required]),
    lastName2: new FormControl('', [Validators.maxLength(30), Validators.required]),
    birth: new FormControl('', [Validators.required]),
    cedula: new FormControl('N/A', [
      Validators.required, Validators.pattern(/^[0-9]{3}-?[0-9]{7}-?[0-9]{1}$/), Validators.maxLength(11), Validators.minLength(11)
    ]),
    pass: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    secondPass: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('Estudiante', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    grado: new FormControl('Primer Grado de Secundaria', [Validators.required]),
    seccion: new FormControl('A', [Validators.required])
  });
  
  error?: string
  uss: User[] = []
  user?: User
  ses = new Array<Sesion>()
  sesOriginal = new Array<Sesion>()

  constructor(private uServ: UserService, private bpServ: BancoPregService, private auth: AuthService) {
    uServ.getAll().subscribe(us => this.uss = us)
    uServ.getById(<number>auth.userValue.id).subscribe(u => this.user = u)
    uServ.getSesion().subscribe(r => {
      this.ses = r.filter(f => f.grado == this.userForm.controls.grado.value)
      this.sesOriginal = r
    })
  }

  filter() {
    this.ses = this.sesOriginal.filter(f => f.grado == this.userForm.controls.grado.value)
  }
  
  registrar() {
    if (this.userForm.controls.role.value == 'Estudiante') {
      this.userForm.controls.cedula.clearValidators();
      this.userForm.controls.cedula.updateValueAndValidity(); 
    }
    if (this.userForm.controls.pass.value != this.userForm.controls.secondPass.value) {
      this.error = 'Las contraseñas no son iguales';
      return;
    }
    if (this.userForm.invalid) {
      this.error = 'Han ocurrido problemas, verifique la informacion ingresa'
      return;
    }
    if (this.userForm.controls.role.value == 'Profesor' || this.userForm.controls.role.value == 'Admin') {
      this.userForm.controls.grado.setValue("");
      this.userForm.controls.seccion.setValue("");
    }

    let u = new User();
    u.name = this.userForm.controls.firstName.value;
    u.lastName1 = this.userForm.controls.lastName1.value;
    u.lastName2 = this.userForm.controls.lastName2.value;
    u.username = this.userForm.controls.email.value;
    u.username = u.username.toLowerCase()
    u.cedula = this.userForm.controls.cedula.value;
    u.password = this.userForm.controls.pass.value;
    u.phone = this.userForm.controls.phone.value;
    u.birth = this.userForm.controls.birth.value;
    u.role = this.userForm.controls.role.value;
    u.grado = this.userForm.controls.grado.value
    u.seccion = this.userForm.controls.seccion.value

    this.uss.forEach(us => {
      if (us.username == u.username) {
        alert('Este E-mail ya esta registrado en el sistema.')
        return;
      }
    })
    this.uServ.insert(u).subscribe(() => {
      let h = new History()
      h.username = `El usuario ${this.auth.userValue.username}, con cedula: ${this.auth.userValue.cedula}`
      h.what = `Ha insertado el usuario ${u.username}`
      this.bpServ.insertHist(h).subscribe()
      alert(`Operacion exitosa`)
  })

  }
}
