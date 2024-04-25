import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../services/Authentification.service';

@Component({
  selector: 'app-create-account',
  
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthentificationService) {}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  register() {
    console.log(this.email + " " + this.password);
    if(this.email == ''){
      alert('Please enter a email');
      return;
    }

    if(this.password == ''){
      alert('Please enter a password');
      return;
    }

    this.auth.createAccount(this.email, this.password);

    this.email = '';
    this.password = '';
  }
}
