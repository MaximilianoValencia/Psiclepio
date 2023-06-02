import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { FAQComponent } from './componentes/faq/faq.component';
import { ProfesionalesComponent } from './componentes/profesionales/profesionales.component';
import { SesionesComponent } from './componentes/sesiones/sesiones.component';
import { AgendaComponent } from './componentes/agenda/agenda.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

const routes: Routes = [
  {path:"",component:BienvenidaComponent},
  {path:'Inicio',component:HomeComponent},
  {path:'Profesionales',component:ProfesionalesComponent},
  {path:'Sesiones', component:SesionesComponent},
  {path:'Agenda',component:AgendaComponent},
  {path:'FAQ',component:FAQComponent},
  {path:'SignUp',component:SignupComponent},
  {path:'Login',component:LoginComponent},
  {path:'Perfil',component:PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
