import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '.././models/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.api}/user/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.api}/user/get/${id}`, {});
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
        Phone: u.phone,
        Nacimiento: u.birth,
        Role: { RoleId: 0, Description: u.role }
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
        Phone: u.phone,
        Nacimiento: u.birth,
        role: u.role
      });
  }

  delete(id: number) {
    return this.http.put<User>(`${environment.api}/user/delete/${id}`, {});
  }
}
