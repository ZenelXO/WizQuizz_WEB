import { Injectable, OnInit, inject } from '@angular/core';
import firebase from "firebase/compat";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";

import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail
} from "@angular/fire/auth";

import app = firebase.app;
import { User } from '../create-account/User';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService implements OnInit{
  //router = inject(Router);
  loggedIn = false;

  constructor(private fireauth : AngularFireAuth, private router : Router) {
    
  }


  ngOnInit(): void {
    sessionStorage.setItem("loggedIn", "false");
  }
  
  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
      sessionStorage.setItem('token', 'true');
      this.router.navigate(['/']);
    }, err => {
      alert('something went wrong');
      this.router.navigate(['/sign-in']);
    })
  }

  createAccount(email : string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('register was succesfull')
      this.router.navigate(['/']);
    }, err => {
      alert('something went wrong');
      this.router.navigate(['/create-account']);
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      sessionStorage.removeItem('token');
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
    })
  }
}
