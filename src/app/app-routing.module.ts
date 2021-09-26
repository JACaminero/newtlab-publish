import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { FillerComponent } from './components/filler/filler.component';
import { UserRegistComponent } from './components/user-regist/user-regist.component';
import { UsersComponent } from './components/users/users.component';
import { UserModifComponent } from './components/user-modif/user-modif.component';
import { BancoPregComponent } from './components/pruebas/banco-preg/banco-preg.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Estudiante'] }
  },
  {
    path: 'reports', canActivate: [AuthGuardService], component: ReportsComponent,
  },
  {
    path: 'perfil', canActivate: [AuthGuardService], component: UserProfileComponent,
  },
  {
    path: 'colegio', component: HomeAdminComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] }
  },
  {
    path: 'registro-usuarios', component: UserRegistComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] },
  },
  {
    path: 'usuarios', component: UsersComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] },
  }, {
    path: 'usuarios/:id', component: UserModifComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] },
  }, {
    path: 'preguntas', component: BancoPregComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] },
  },
  {
    path: '', canActivate: [AuthGuardService], component: FillerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
