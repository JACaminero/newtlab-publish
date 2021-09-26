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
    firstName: new FormControl('', [Validators.required]),
    lastName1: new FormControl('', [Validators.required]),
    lastName2: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private uServ: UserService, private route: ActivatedRoute) { }

  current: User = new User()
  ngOnInit(): void {
    let id: unknown = this.route.snapshot.paramMap.get('id');
    this.uServ.getById(<number>id).subscribe(u => {
      this.current = u;
      let formattedDate = this.formatDate(<Date>u.birth)
      this.userForm.patchValue({
        firstName: this.current.name,
        lastName1: this.current.lastName1,
        lastName2: this.current.lastName2,
        birth: formattedDate,
        cedula: this.current.cedula,
        phone: this.current.phone,
        email: this.current.username
      })
    });
  }


  modificar() {
    this.current.name = this.userForm.controls.firstName.value;
    this.current.lastName1 = this.userForm.controls.lastName1.value;
    this.current.lastName2 = this.userForm.controls.lastName2.value;
    this.current.username = this.userForm.controls.email.value;
    this.current.cedula = this.userForm.controls.cedula.value;
    this.current.phone = this.userForm.controls.phone.value;
    this.current.birth = this.userForm.controls.birth.value;
    this.uServ.modify(this.current).subscribe();
    if(this.userForm.valid)
    alert('Operacion exitosa')
   else
    alert('Error')

  }

  formatDate(originalDate: Date) {
    let date = new Date(originalDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let strDay = date.getDay().toString();
    let strMonth = date.getDay().toString();

    if (day < 10) {
      strDay = '0' + day;
    }
    if (month < 10) {
      strMonth = '0' + month;
    }

    return year + '-' + strMonth + '-' + strDay
  }
}
