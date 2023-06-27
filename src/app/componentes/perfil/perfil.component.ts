import { Component } from '@angular/core';
import { FotoUpload } from 'src/app/models/foto-upload.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/servicios/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  perfilData : User = {
    nombre: '',
    fechaNacimiento:   '',
    genero:   '',
    email:   '',
    numero:   '',
    isPaciente:   false,
    isProfesional:  false,
    descripcion:  '',
    fotoPerfilUrl: '',
    emailVerified: true,
    uid: '',
    isDeleted:false
  }
  isEditMode: boolean = false;
  constructor(private authService: AuthService, private http:HttpClient,
    private db: AngularFireDatabase, private storage: AngularFireStorage){};

  ngOnInit(){
    setTimeout(() => {
    console.log("perfil con uid " + (this.authService.userData as User).uid)
    this.getDatosPerfilUsuario()
  }, 1000);
  }
  getDatosPerfilUsuario(){
    this.http.get("http://localhost:8080/getDatosPerfilUsuario:"+this.authService.userData.uid).subscribe( (data) =>{
      const userInfo : User = JSON.parse(JSON.stringify(data));
      this.perfilData = userInfo;
      console.log( this.perfilData );
    })
  }

  //upload
  selectedFiles?: FileList;
  currentFileUpload?: FotoUpload;
  // percentage = 0;
  
  elegirFoto(event: any): void {
    this.selectedFiles = event.target.files;
    //console.log(this.selectedFiles)
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.perfilData.fotoPerfilUrl = reader.result as string;
    // };
    // if(event.target.files[0]){
    //   reader.readAsDataURL(event.target.files[0]);
    // }
  }

  //subir foto a firebase
  private basePath = '/uploads';
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      const uid = this.authService.userData.uid
      if (file) {
        this.currentFileUpload = new FotoUpload(file, uid );
        //this.uploadService.pushFileToStorage().subscribe();
        const filePath = `${this.basePath}/${this.currentFileUpload.foto.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.currentFileUpload.foto);
        
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              //console.log(downloadURL);
              this.perfilData.fotoPerfilUrl=downloadURL;
            });
          })
        ).subscribe();
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
    //console.log(this.perfilData.fotoPerfilUrl)
    setTimeout(() => {
      this.http.put("http://localhost:8080/guardarPerfil",this.perfilData).subscribe( (resdata) =>{
        console.log("Perfil guardado!");
      })
    }, 5000);
  }
}


