import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BancoPreg, Pregunta, Respuesta } from '.././models/models';

@Injectable({
  providedIn: 'root'
})
export class BancoPregService {
  constructor(private http: HttpClient) { }

  insertPreg(p: Pregunta) {
    return this.http.post(`${environment.api}/pregunta`, p)
  }

  getPreg(id: number) {
    return this.http.get<Pregunta[]>(`${environment.api}/pregunta/${id}`) 
  }

  getResp(id: number) {
    return this.http.get<Respuesta[]>(`${environment.api}/pregunta/respuestas/${id}`) 
  }

  deletePregunta(id?: number) {
    return this.http.delete(`${environment.api}/pregunta/${id}`) 
  }

  insert(name :string, exp: number) {
    return this.http.post(`${environment.api}/bancopregunta`, {
      Tema: name,
      ExperimentoId: exp
    })
  }

  deleteBanco(id?: number) {
    return this.http.delete(`${environment.api}/bancopregunta/${id}`) 
  }
  
  getById(id: number) {
    return this.http.get<BancoPreg>(`${environment.api}/bancopregunta/${id}`) 
  }

  get() {
    return this.http.get<BancoPreg[]>(`${environment.api}/bancopregunta`) 
  }
}
