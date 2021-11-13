import { Component, OnInit } from '@angular/core';
import { BancoPreg, User } from 'src/app/models/models';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-banco-preg-show',
  templateUrl: './banco-preg-show.component.html',
  styleUrls: ['../users/users.component.scss', './banco-preg-show.component.scss']
})
export class BancoPregShowComponent implements OnInit {

  user: any;
  bps?: BancoPreg[] = []
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    exper: new FormControl('g'),
    grado: new FormControl('Primer Grado de Secundaria', [Validators.required]),
  });

  constructor(private bpServ: BancoPregService, private auth: AuthService, private uServ: UserService) {
    this.auth.user.subscribe(x => this.user = x);    
  }

  ngOnInit(): void {
    this.bpServ.get().subscribe(us => {
      us.forEach(element => {
        this.uServ.getById(element.userId).subscribe(uu => {
          element.username = `${uu.name} ${uu.lastName1}`
          this.bps = us;
        })
      });
    });
  }

  onSubmit() {
    this.bps?.forEach(r => {
      if (r.tema == this.form.controls.name.value) {
        alert('Ya existe un banco de preguntas con este nombre.')
        return;
      }
    })
    let k: number = 0
    //BULLSHIT
    switch (this.form.controls.exper.value) {
      case 'g':
        k = 7
        break;
      case 'i':
        k = 8
        break;
      case 'a':
        k = 9
        break;
      default:
        break;
    }
     
    let gotDamn: User = this.user
    this.bpServ.insert(this.form.controls.name.value, Object.values(gotDamn)[0], k, this.form.controls.grado.value)
      .subscribe(() => {
        alert('¡Operacion Exitosa!');
        window.location.reload()
      });
  }

  onDelete(id?: number) {
    this.bpServ.deleteBanco(id).subscribe(() => window.location.reload());
  }

  on(id?: number) {
    this.bpServ.onBanco(id).subscribe(() => window.location.reload());
  }
}
