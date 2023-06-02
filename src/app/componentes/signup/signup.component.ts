import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(
    private auth: AuthService
  ){}

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  submitForm() {
    if (this.formData.password === this.formData.confirmPassword) {
      console.log('Form submitted:', this.formData);
      this.auth.SignUp(this.formData.email,this.formData.password).then(()=>{

      })
    } else {
      console.log('Passwords do not match');
    }
  }
}