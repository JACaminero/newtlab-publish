import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { Role } from './models/models';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Estudiante'] }
  },
  {
    path: 'colegio', component: HomeAdminComponent,
    canActivate: [AuthGuardService],
    data: { role: ['Profesor'] }
  },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
