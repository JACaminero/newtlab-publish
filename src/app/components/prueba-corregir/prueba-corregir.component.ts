import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BancoPreg, Pregunta, PruebaExperimento, PruebaRespuesta, Respuesta, User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { PruebaService } from 'src/app/services/prueba.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prueba-corregir',
  templateUrl: './prueba-corregir.component.html',
  styleUrls: ['./prueba-corregir.component.scss', '../home/home.component.scss']
})
export class PruebaCorregirComponent implements OnInit {

  user: any = { name: ` ` };
  pregresps?: PruebaRespuesta[];
  id: unknown
  prueba: PruebaExperimento = new PruebaExperimento()
  pruebaForm = new FormGroup({})
  califTotal: number = 0
  respuestaCorrecta: Respuesta[] = []

  constructor(private uServ: UserService, private route: ActivatedRoute, private fb: FormBuilder,
    private bpService: BancoPregService, private pService: PruebaService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')

    pService.getById(<number>this.id).subscribe(b => {
      
      this.prueba = b
      this.uServ.getById(<number>this.prueba?.userId).subscribe(u => {
        this.user.name = `${u.name} ${u.lastName1} ${u.lastName2}`
      })
      pService.getRespuestaPruebas(<number>this.prueba.pruebaExperimentoId)
        .subscribe(here => {
          
          this.pregresps = here
          this.pregresps.forEach(r => {
            this.califTotal += +<number>r.pregunta?.puntuacion
            bpService.getResp(r.preguntaId).subscribe(resp => {
              resp.filter(r => r.esCorrecta == true).forEach(rDenuevo => this.respuestaCorrecta.push(rDenuevo))
            })
          })

        })
    })
  }

  ngOnInit(): void {
    
  }

}
