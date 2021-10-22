import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BancoPreg, PruebaExperimento } from 'src/app/models/models';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { UserService } from 'src/app/services/user.service';
import { PruebaService } from 'src/app/services/prueba.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  bps?: BancoPreg[]
  user?: any;
  pruebaForm = new FormGroup({})

  constructor(private pServ: PruebaService, private auth: AuthService, private uServ: UserService
    , private bpServ: BancoPregService, private fb: FormBuilder) {
    this.auth.user.subscribe(x => this.user = x);
  }
  ngOnInit(): void {
    this.bpServ.get().subscribe(bp => {

      this.pServ.getAllPruebasByUser(this.user.id).subscribe(pes => {

        this.bps = bp.filter(bp => bp.publicado == true)

        bp.forEach(element => {

          this.pruebaForm.addControl(element.tituloPublicado!, this.fb.control('Tomar prueba'))

          let pruebas = <PruebaExperimento[]>pes.data
          pruebas.forEach(prb => {

            if (prb.titulo == element.tituloPublicado) {
              this.pruebaForm.get(element.tituloPublicado!)?.disable()
              this.pruebaForm.get(element.tituloPublicado!)?.setValue("Ya has tomado esta prueba")
            }

            this.uServ.getById(element.userId).subscribe(uu => {
              element.username = `${uu.name} ${uu.lastName1}`
            });

          });

        })
      })
    })

  }
}
