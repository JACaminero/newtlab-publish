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

  getResp(id?: number) {
    return this.http.get<Respuesta[]>(`${environment.api}/pregunta/respuestas/${id}`)
  }

  insert(name: string, userId?: number, exp?: number) {
    return this.http.post(`${environment.api}/bancopregunta`, {
      Tema: name,
      ExperimentoId: exp,
      UserId: userId
    })
  }

  habilitarPregunta(id?: number) {
    return this.http.delete(`${environment.api}/pregunta/habilitar/${id}`)
  }

  deletePregunta(id?: number) {
    return this.http.delete(`${environment.api}/pregunta/${id}`)
  }

  deleteBanco(id?: number) {
    return this.http.delete(`${environment.api}/bancopregunta/${id}`)
  }

  onBanco(id?: number) {
    return this.http.delete(`${environment.api}/bancopregunta/on/${id}`)
  }

  publicar(id?: number, limit?: PublicarVM, tituloPublic?: string) {
    return this.http.put(`${environment.api}/bancopregunta/publicar/${id}`, {
      fechaLimite: limit?.limit,
      tituloPublicado: tituloPublic,
      descripcion: limit?.descripcion,
      instruccion: limit?.instruccion,
    })
  }

  deshabilitar(id?: number) {
    return this.http.put(`${environment.api}/bancopregunta/deshabilitar/${id}`, {})
  }

  getById(id: number) {
    return this.http.get<BancoPreg>(`${environment.api}/bancopregunta/${id}`)
  }

  get() {
    return this.http.get<BancoPreg[]>(`${environment.api}/bancopregunta`)
  }
}

export class PublicarVM {
  limit?: Date
  descripcion?: string
  instruccion?: string
}