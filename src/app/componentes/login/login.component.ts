import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { User } from 'src/app/servicios/user';
import {Renderer2, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(
    public AuthService: AuthService,
    private http:HttpClient,
    private router:Router,
    private renderer: Renderer2, private elementRef: ElementRef
  ){}
  captchaResponse: string = "";
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  ngOnInit(){
    const script = this.renderer.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }
  
  urlogin:string='http://localhost:8080/loginUser';
  
  submitForm() {
    if (this.captchaResponse) {
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
