import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  nombre: string = 'Nombre de la Persona';
  fechaNacimiento: string = 'DD/MM/YY';
  genero: string = 'Género de la persona';
  mail: string = 'mail@mail.com';
  numero: string = '+569 999 999 99';

  isPaciente: boolean = false;
  isProfesional: boolean = false;
}
