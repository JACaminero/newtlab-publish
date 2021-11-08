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
import { ShitComponent } from './components/shit/shit.component';
import { SesionComponent } from './components/sesion/sesion.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'reports', canActivate: [AuthGuardService], component: ReportsComponent,
  },
  {
    path: 'irrelevant', canActivate: [AuthGuardService], component: ShitComponent,
  },
  {
    path: 'perfil', canActivate: [AuthGuardService], component: UserProfileComponent,
  },
  {
    path: 'experimento/:experimento/:id', component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Estudiante'] }
  },
  {
    path: 'colegio', component: HomeAdminComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] }
  },
  {
    path: 'registro-usuarios', component: UserRegistComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Admin'] },
  },
  {
    path: 'usuarios', component: UsersComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Admin'] },
  }, {
    path: 'usuarios/:id', component: UserModifComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Admin'] },
  }, {
    path: 'preguntas/:id', component: BancoPregComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Admin'] },
  },
  {
    path: '', canActivate: [AuthGuardService], component: FillerComponent
  },
  {
    path: 'sesion', component: SesionComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Admin'] },
  },
  {
    path: 'show-banco', component: BancoPregShowComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Admin'] },
  },
  {
    path: 'pruebas', component: ShowPruebaComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Estudiante', 'Admin'] },
  },
  {
    path: 'prueba/:id/user/:userId', component: PruebaCorregirComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor', 'Estudiante', 'Admin'] },
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
