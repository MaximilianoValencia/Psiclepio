import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import {Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  captcha: string ="" ;
  constructor(
    public authService: AuthService,
    private http:HttpClient,
    private router:Router,
    private renderer: Renderer2, private elementRef: ElementRef
  ){}
  
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  };

  ngOnInit(){
    
  }
  resolved(captchaResponse:string){
    console.log("antes captcha ==" + this.captcha);
    this.captcha=captchaResponse;
    console.log("resolved con este respuesta "+ this.captcha)
  }  

  submitForm() { 
    if (this.captcha) {
    this.authService.SignIn(this.formData.email,this.formData.password).then(()=>{
      setTimeout(() => {
        this.http.post("http://localhost:8080/loginUser",{uid:this.authService.userData.uid , nombre: this.formData.name, email:this.formData.email }).subscribe((resdata) =>{
          console.log("respuesta del server :D!" + JSON.stringify(resdata));
        })
      }, 1000);
    }).catch((error)=> console.log(error));
    } else {
      this.formData.name="";
      this.formData.email="";
      this.formData.password="";
      this.formData.confirmPassword="";
      alert("Captcha invalido");
    }
  }
}
