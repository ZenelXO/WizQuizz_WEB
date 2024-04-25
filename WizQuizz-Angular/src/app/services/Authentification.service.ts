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
  router = inject(Router);
  loggedIn = false;

  constructor() {
    
  }
  ngOnInit(): void {
    localStorage.setItem("loggedIn", "false");
  }
  
  createAccount(user:User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
}
