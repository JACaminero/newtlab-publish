import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { QuillModule } from 'ngx-quill';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { eye, plus, check, x, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DescriptionComponent } from './components/experiment/description/description.component';
import { InstructionsComponent } from './components/experiment/instructions/instructions.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { DinamicsComponent } from './components/dinamics/dinamics.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ReportDialog, ReportsComponent } from './components/reports/reports.component';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { FillerComponent } from './components/filler/filler.component';
import { UserRegistComponent } from './components/user-regist/user-regist.component';
import { UsersComponent } from './components/users/users.component';
import { UserModifComponent } from './components/user-modif/user-modif.component';
import { BancoPregComponent, RespuestaDialog } from './components/pruebas/banco-preg/banco-preg.component';
import { BancoPregShowComponent } from './components/banco-preg-show/banco-preg-show.component';
import { InerciaComponent } from './components/inercia/inercia.component';
import { ShowPruebaComponent } from './components/show-prueba/show-prueba.component';
import { PruebaCorregirComponent } from './components/prueba-corregir/prueba-corregir.component';
import { InerciaRealComponent } from './components/inercia-real/inercia-real.component';
import { ShitComponent } from './components/shit/shit.component';
import { SesionComponent } from './components/sesion/sesion.component'
import {DatePipe} from '@angular/common';
import { HistoryComponent } from './components/history/history.component';

const icons = {
  plus,
  check,
  x, eye
};

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NavbarComponent,
    DescriptionComponent,
    InstructionsComponent,
    HomeComponent,
    HomeAdminComponent,
    DinamicsComponent,
    UserProfileComponent,
    ReportsComponent,
    FillerComponent,
    UserRegistComponent,
    UsersComponent,
    UserModifComponent,
    BancoPregComponent,
    BancoPregShowComponent,
    RespuestaDialog,
    ReportDialog,
    InerciaComponent,
    ShowPruebaComponent,
    PruebaCorregirComponent,
    InerciaRealComponent,
    ShitComponent,
    SesionComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    HttpClientModule,
    NgxBootstrapIconsModule.pick(icons),
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    GridModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    QuillModule.forRoot()
  ],
  providers: [PageService, DatePipe, SortService, FilterService, GroupService],
  bootstrap: [AppComponent]

})
export class AppModule { }
