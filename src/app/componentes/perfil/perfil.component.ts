import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  profilePhoto: string ="";
  name: string ="";
  dateOfBirth: string ="";
  gender: string ="";
  email: string ="";
  phoneNumber: string="";
  aboutMe: string="";
}
