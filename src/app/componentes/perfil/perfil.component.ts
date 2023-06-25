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
  descriptionText: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet ligula purus, et sodales purus tristique ac.';



  isEditMode: boolean = false;

  toggleEditMode() {
    if(this.isEditMode){
      this.guardarPerfil();
    }else{
      this.editPerfil();
    }
    this.isEditMode = !this.isEditMode;
  }


  editPerfil(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
      input.disabled = false;
      input.style.backgroundColor = 'white';
    });
  }

  guardarPerfil(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
      input.disabled = true;
      input.style.backgroundColor = '#B3DDD3';
    });

    //POST REQ TODO

    console.log("Inputs saved!");
  }

}


