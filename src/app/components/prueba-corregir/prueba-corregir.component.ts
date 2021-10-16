import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BancoPreg, Pregunta, PruebaExperimento, PruebaRespuesta, User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-prueba-corregir',
  templateUrl: './prueba-corregir.component.html',
  styleUrls: ['./prueba-corregir.component.scss', '../home/home.component.scss']
})
export class PruebaCorregirComponent implements OnInit {

  user?: User;
  preguntas?: Pregunta[];
  id: unknown
  prueba: PruebaExperimento = new PruebaExperimento()
  respondidas: PruebaRespuesta[] = [];
  pruebaForm = new FormGroup({})
  califTotal: number = 0

  constructor(private auth: AuthService, private route: ActivatedRoute, private fb: FormBuilder,
    private bpService: BancoPregService, private pService: PruebaService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')

    pService.getById(<number>this.id).subscribe(b => {
      this.prueba = b
      bpService.getPreg(<number>this.prueba.bancoPreguntaId).subscribe(here => {

        this.preguntas = here.filter(r => r.isOn == true);
        this.preguntas.forEach(preg => {
          if (preg.isOn) {
            this.califTotal += +<number>preg.puntuacion
          }
        })

        this.preguntas.forEach(p => {
          this.bpService.getResp(p.preguntaId).subscribe(r => {
            p.respuestas = r
            p.respuestas.forEach(
              control => this.pruebaForm.addControl(<string>control.descripcion, this.fb.control(control.respuestaId)));
          })
        })
      })
    })
  }

  ngOnInit(): void {
  }

}
