import { Injectable, OnInit, inject } from '@angular/core';
import firebase from "firebase/compat";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { User } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthentificationService implements OnInit{
  //router = inject(Router);
  loggedIn = false;

  constructor(private fireauth : AngularFireAuth, private router : Router) {
    
  }


  ngOnInit(): void {
    localStorage.setItem("loggedIn", "false");
  }
  
  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/']);
    }, err => {
      alert('something went wrong');
      this.router.navigate(['/sign-in']);
    })
  }

  async createAccount(email : string, password: string) : Promise<string | null>{
    return await this.fireauth.createUserWithEmailAndPassword(email, password).then((result : any) => {
      alert('register was succesfull')
      //this.router.navigate(['/']);
      let user : User = result.user;
      //console.log(user.uid);
      return user.uid;
    }, err => {
      alert('something went wrong');
      //this.router.navigate(['/create-account']);
      return null;
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
    })
  }
}
