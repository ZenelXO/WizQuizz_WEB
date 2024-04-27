import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../services/Authentification.service';
import { FirestoreService } from '../services/firestore.service';
import { User } from '../data/interfaces';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-create-account',
  
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthentificationService, private firestore : FirestoreService, private storage : StorageService) {}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  

  async register() {
    console.log(this.email + " " + this.password);
    if(this.email == ''){
      alert('Please enter a email');
      return;
    }

    if(this.password == ''){
      alert('Please enter a password');
      return;
    }

    let authKey = await this.auth.createAccount(this.email, this.password);
    if(authKey !== null){
      let user : User = {
        email: this.email,
        password: this.password,
        uid: authKey,
        imageUrl: '/assets/wizquizz-logo.png'
      }
      this.firestore.addUser(user);
      this.storage.uploadFile("/assets/img/common/wizquizz-logo.png");
    }

    alert("creado correctamente");

    this.email = '';
    this.password = '';
  }
}
