import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Concepto, PruebaExperimento, PruebaRespuesta } from '../models/models';
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

  getById(id: number) {
    return this.http.get<any>(`${environment.api}/prueba/${id}`)
  }

  getAll() {
    return this.http.get<any>(`${environment.api}/prueba/`)
  }

  getRespuestaPruebas(pruebaId: number) {
    return this.http.get<PruebaRespuesta[]>(`${environment.api}/prueba/respuestas/${pruebaId}`)  

  }

  InsertConcepto(c: Concepto) {
    return this.http.post<any>(`${environment.api}/tipopregunta/conceptos`, c)
  }

  getAllConcepto(id?: number) {
    return this.http.get<Concepto[]>(`${environment.api}/tipopregunta/conceptos`)
  }

  getByIdConcepto(id: number) {
    return this.http.get<Concepto>(`${environment.api}/tipopregunta/conceptos/${id}`)
  }

  updateConcepto(c: Concepto) {
    return this.http.put(`${environment.api}/tipopregunta/conceptos`, c)
  }

}
