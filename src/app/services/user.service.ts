import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Sesion, User } from '.././models/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.api}/user/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.api}/user/${id}`, {});
  }

  insertSesion(s: Sesion) {
    return this.http.post<any>(`${environment.api}/user/insert/sesion`, s)
  }

  getSesion() {
    return this.http.get<Sesion[]>(`${environment.api}/user/sesion`);
  }

  onSesion(id?: number) {
    return this.http.put(`${environment.api}/user/sesion/on/${id}`, {});
  }

  offSesion(id?: number) {
    return this.http.put<Sesion>(`${environment.api}/user/sesion/delete/${id}`, {})
  }

  insert(u: User) {
    return this.http.post<any>(`${environment.api}/user/insert`,
      {
        Username: u.username,
        Password: u.password,
        Name: u.name,
        LastName1: u.lastName1,
        LastName2: u.lastName2,
        Cedula: u.cedula,
        Phone: u.phone.toString().concat('.'),
        Nacimiento: u.birth,
        Role: { RoleId: 0, Description: u.role },
        Grado: u.grado,
        Seccion: u.seccion
      })
  }

  modify(u: User) {
    return this.http.put<any>(`${environment.api}/user/modify`,
      {
        UserId: u.userId,
        Username: u.username,
        Password: u.password,
        Name: u.name,
        LastName1: u.lastName1,
        LastName2: u.lastName2,
        Cedula: u.cedula,
        Phone: u.phone.toString().concat('.'),
        Nacimiento: u.birth,
        role: {id:1, descripcion: 1},
        Grado: u.grado,
        Seccion: u.seccion
      });
  }

  enable(id: number) {
    return this.http.put<User>(`${environment.api}/user/enable/${id}`, {});
  }
  
  delete(id: number) {
    return this.http.put<User>(`${environment.api}/user/delete/${id}`, {});
  }
}
