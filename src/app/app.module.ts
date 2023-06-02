import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HomeComponent } from './componentes/home/home.component';
import { FAQComponent } from './componentes/faq/faq.component';
import { ProfesionalesComponent } from './componentes/profesionales/profesionales.component';
import { AgendaComponent } from './componentes/agenda/agenda.component';
import { SesionesComponent } from './componentes/sesiones/sesiones.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { LoginComponent } from './componentes/login/login.component';
import { environment } from '../environments/environment';
import { AuthService } from './servicios/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PerfilComponent } from './componentes/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FAQComponent,
    ProfesionalesComponent,
    AgendaComponent,
    SesionesComponent,
    SignupComponent,
    LoginComponent,
    BienvenidaComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    BrowserAnimationsModule, MatTooltipModule
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
