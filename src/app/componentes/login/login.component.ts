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
    public AuthService: AuthService,
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

  urlogin:string='http://localhost:8080/loginUser';
  
  submitForm() {
    if (this.captcha) {
    this.AuthService.SignIn(this.formData.email,this.formData.password);
    this.http.post(this.urlogin,this.formData).subscribe((resdata) =>{
       console.log("respuesta del server :D!" + JSON.stringify(resdata));
      })
    } else {
      this.formData.name="";
      this.formData.email="";
      this.formData.password="";
      this.formData.confirmPassword="";
      alert("Captcha invalido");
    }
  }
}
