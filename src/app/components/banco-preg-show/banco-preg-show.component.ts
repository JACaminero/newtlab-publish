import { Component, OnInit } from '@angular/core';
import { BancoPreg } from 'src/app/models/models';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banco-preg-show',
  templateUrl: './banco-preg-show.component.html',
  styleUrls: ['../users/users.component.scss', './banco-preg-show.component.scss']
})
export class BancoPregShowComponent implements OnInit {

  constructor(private bpServ: BancoPregService) { }

  bps?: BancoPreg[] = []
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    exper: new FormControl('g'),
  });

  ngOnInit(): void {
    this.bpServ.get().subscribe(us => {
      this.bps = us;
      console.log(us);
    });
  }

  onSubmit() {
    let k: number = 0
    //BULLSHIT
    switch (this.form.controls.exper.value) {
      case 'g':
        k = 1
        break;
      case 'i':
        k = 2
        break;
      case 'a':
        k = 4
        break;
      default:
        break;
    }
    this.bpServ.insert(this.form.controls.name.value, k)
      .subscribe(() => {
        alert('¡Operacion Exitosa!');
        window.location.reload()
      });
  }

  onDelete(id?: number) {
    this.bpServ.deleteBanco(id).subscribe(() => window.location.reload());
  }
}
