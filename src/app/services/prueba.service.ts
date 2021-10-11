import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PruebaExperimento, PruebaRespuesta } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(public http: HttpClient) { }

  uploadTest(pe: PruebaExperimento, prs: PruebaRespuesta[]) {
    return this.http.post<any>(`${environment.api}/prueba`, {
      pe: pe,
      prs: prs
    })
  }

  getAllPruebasByUser(id?: number) {
    return this.http.get<any>(`${environment.api}/prueba/user/${id}`)
  }
}
