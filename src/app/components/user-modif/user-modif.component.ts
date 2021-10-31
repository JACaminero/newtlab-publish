import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/models';

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
    birth: new FormControl({}, [Validators.required]),
    cedula: new FormControl('', [
      Validators.required, Validators.pattern(/^[0-9]{3}-?[0-9]{7}-?[0-9]{1}$/),
      Validators.maxLength(11), Validators.minLength(11)
    ]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    grado: new FormControl(''),
    seccion: new FormControl('A')
  });

  uss: User[] = []
  id: unknown
  emailOriginal = ''
  constructor(private uServ: UserService, private route: ActivatedRoute) {
    uServ.getAll().subscribe(us => this.uss = us)
  }

  current: User = new User()
  dat?: string

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')

    this.uServ.getById(<number>this.id).subscribe(u => {
      this.emailOriginal = u.username
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
  }


  modificar() {

    if (this.userForm.invalid) {
      alert('Han ocurrido problemas con la informacion ingresa')
      return;
    }

    if (this.current.role == 'Estudiante') {
      this.userForm.controls.cedula.clearValidators();
      this.userForm.controls.cedula.updateValueAndValidity();
    }

    this.current.name = this.userForm.controls.firstName.value;
    this.current.lastName1 = this.userForm.controls.lastName1.value;
    this.current.lastName2 = this.userForm.controls.lastName2.value;
    this.current.username = this.userForm.controls.email.value;
    this.current.cedula = this.userForm.controls.cedula.value;
    this.current.phone = this.userForm.controls.phone.value;
    this.current.birth = this.userForm.controls.birth.value == {} ? this.current.birth : this.userForm.controls.birth.value;
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
}
