import { Component } from '@angular/core';
import { FotoUpload } from 'src/app/models/foto-upload.model';
import { FotoUploadService } from 'src/app/servicios/foto-upload.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  perfilData = {
    nombre: 'Nombre de la Persona',
    fechaNacimiento:   'DD/MM/YY',
    genero:   'Género de la persona',
    mail:   'mail@mail.com',
    numero:   '+569 999 999 99',
    isPaciente:   false,
    isProfesional:  false,
    descripcion:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet ligula purus, et sodales purus tristique ac.',
    fotoPerfilUrl: ''
  }
  isEditMode: boolean = false;
  constructor(private uploadService: FotoUploadService,private authService: AuthService){};

  //upload
  selectedFiles?: FileList;
  currentFileUpload?: FotoUpload;
  // percentage = 0;
  
  elegirFoto(event: any): void {
    this.selectedFiles = event.target.files;
    //console.log(this.selectedFiles)
    const reader = new FileReader();
    reader.onload = () => {
      this.perfilData.fotoPerfilUrl = reader.result as string;
    };
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      const uid = this.authService.userData.uid
      if (file) {
        this.currentFileUpload = new FotoUpload(file, uid );
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe();
      }
    }
  }

  toggleEditMode(){
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
    this.upload() //subir a firebase
    //POST REQ  API-REST TODO

    //TODO^^^^

    console.log("Perfil guardado!");
  }
}


