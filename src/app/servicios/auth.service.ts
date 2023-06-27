import { Injectable, NgZone } from '@angular/core';
import { User } from '../servicios/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  baseurl:string = "http://localhost:8080/"

  userData: any; // Save logged in user data
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private http:HttpClient,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        //console.log(user)
        console.log("uid: "+user.uid);
        this.userData = user;
        //console.log(this.userData)
        localStorage.setItem('user', JSON.stringify(this.userData));
        //console.log("login: "  + localStorage.getItem('user')!)
      } else {
        localStorage.setItem('user', 'null');
        //console.log("logout:  "+ localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // console.log("SignIn")
        // console.log(result)
        // console.log(result.user)
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['Inicio']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
        this.router.navigate(['Inicio']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u: any) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null //&& user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     this.router.navigate(['dashboard']);
  //   });
  // }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['Inicio']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(!error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      nombre: user.nombre,
      fotoPerfilUrl: "",
      emailVerified: true,
      isPaciente: false,
      isProfesional: false,
      fechaNacimiento: "",
      genero:"",
      numero:"",
      descripcion: ""
    };
    return;
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('User');
      this.router.navigate(['']);
    });
  }
}