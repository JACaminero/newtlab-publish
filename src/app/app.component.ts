import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'NewtLabFront';
  user?: User;
  constructor(private auth: AuthService) {
    this.auth.user.subscribe(x => this.user = x);
  }
  get isAdmin() {
    return this.user && this.user.role === 'Admin';
  }

  get isProfesor() {
    return this.user && this.user.role === 'Profesor';
  }

  get isEstudiante() {
    return this.user && this.user.role === 'Estudiante';
  }
}
