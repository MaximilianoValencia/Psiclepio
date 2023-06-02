import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(
    public AuthService: AuthService,
    private http:HttpClient,
    private router:Router
  ){}

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  ngOnInit(){}
  
  url:string= 'http://localhost:8080/loginUser'
  submitForm() {
    this.AuthService.SignIn(this.formData.email,this.formData.password);
    this.http.post(this.url,this.formData).subscribe(resdata =>{ console.log("respuesta del server :D!")} )
  }
}
