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
import { BancoPregShowComponent } from './components/banco-preg-show/banco-preg-show.component';
import { ShowPruebaComponent } from './components/show-prueba/show-prueba.component'
import { PruebaCorregirComponent } from './components/prueba-corregir/prueba-corregir.component';
import { InerciaRealComponent } from './components/inercia-real/inercia-real.component';
import { InerciaComponent } from './components/inercia/inercia.component';
import { DinamicsComponent } from './components/dinamics/dinamics.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'experimento/:experimento/:id', component: HomeComponent,
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
    path: 'preguntas/:id', component: BancoPregComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] },
  },
  {
    path: '', canActivate: [AuthGuardService], component: FillerComponent
  },
  {
    path: 'show-banco', component: BancoPregShowComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] },
  },
  {
    path: 'pruebas', component: ShowPruebaComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Estudiante'] },
  },
  {
    path: 'prueba/:id/user/:userId', component: PruebaCorregirComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Estudiante'] },
  },
  {
    path: 'inercia', component: InerciaRealComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Estudiante'] },
  },
  {
    path: 'accreacc', component: InerciaComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Estudiante'] },
  },
  {
    path: 'gravedad', component: DinamicsComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Estudiante'] },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
