import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  captcha: string ="" ;
  constructor(
    private auth: AuthService, private http:HttpClient
  ){}

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  
  resolved(captchaResponse:string){
    console.log("antes captcha ==" + this.captcha);
    this.captcha=captchaResponse;
    console.log("resolved con este respuesta "+ this.captcha)
  }

  submitForm() {
    if (this.formData.password === this.formData.confirmPassword) {
      if(this.captcha){
        //console.log('Form submitted:', this.formData);
        this.auth.SignUp(this.formData.email,this.formData.password).then(()=>{
          setTimeout(() => {
            this.http.post("http://localhost:8080/crearUsuario",{uid:this.auth.userData.uid , nombre: this.formData.name, email:this.formData.email }).subscribe( (resdata) =>{
              console.log("usuario creado en bd con respuesta " + (resdata));
            });
          }, 1000);
        })
      } else{
        alert("Captcha invalido"); 
      }
    }else {
        console.log('Passwords do not match');
    }
  }
}