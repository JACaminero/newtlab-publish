import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BancoPreg, PruebaExperimento, User } from 'src/app/models/models';
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
  user?: User;
  pruebaForm = new FormGroup({})

  constructor(private pServ: PruebaService, private auth: AuthService, private uServ: UserService
    , private bpServ: BancoPregService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bpServ.get().subscribe(bp => {
      this.auth.user.subscribe(x => {
        this.uServ.getById(<number>x.id).subscribe(u => {
          this.user = u

          this.user.cedula =
            `${this.user.cedula?.substring(0, 3)}-${this.user.cedula?.substring(4, 10)}-${this.user.cedula?.charAt(10)}`

          this.pServ.getAllPruebasByUser(this.user?.userId).subscribe(pes => {

            this.user?.role == 'Estudiante' ? this.bps = bp.filter(bp => bp.publicado == true)
              .filter(r => r.grado == this.user?.grado).filter(t => t.fechaLimite! <= Date())
              :
               this.bps = bp.filter(bp => bp.publicado == true)
            bp.forEach(element => {

              this.pServ.getAll().subscribe(prbs => {
                let pruebs = <PruebaExperimento[]>prbs.data

                pruebs.filter(filter => filter.isCerrada)
                  .forEach(d => {
                    const index: number = this.bps?.findIndex(obj => obj.tituloPublicado === d.titulo)!
                    if (index > -1) {
                      this.bps?.splice(index, 1);
                    }
                  });
              })

              this.uServ.getById(element.userId).subscribe(uu => {
                element.username = `${uu.name} ${uu.lastName1}`
              });
              
              this.pruebaForm.addControl(element.tituloPublicado!, this.fb.control('Tomar prueba'))
              let pruebas = <PruebaExperimento[]>pes.data

              pruebas.forEach(prb => {

                if (prb.titulo == element.tituloPublicado) {
                  const index: number = this.bps?.findIndex(obj => obj.tituloPublicado === prb.titulo)!
                  if (index > -1) {
                    this.bps?.splice(index, 1);
                  }
                  this.pruebaForm.get(element.tituloPublicado!)?.disable()
                  this.pruebaForm.get(element.tituloPublicado!)?.setValue("Ya has tomado esta prueba")
                }

              });
            })
          })
        })
      })
    });

  }
}
