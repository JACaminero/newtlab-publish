import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BancoPreg, Pregunta } from '.././models/models';

@Injectable({
  providedIn: 'root'
})
export class BancoPregService {
  constructor(private http: HttpClient) { }

  insert(name :string) {
    return this.http.post(`${environment.api}/bancopregunta`, {
      Tema: name
    })
  }

  getById(id: number) {
    return this.http.get<BancoPreg>(`${environment.api}/bancopregunta/${id}`) 
  }

  get() {
    return this.http.get<BancoPreg[]>(`${environment.api}/bancopregunta`) 
  }
}
