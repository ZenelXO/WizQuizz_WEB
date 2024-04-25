import { Component } from '@angular/core';
import { AuthentificationService } from '../services/Authentification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthentificationService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  login() {
    if(this.email == ''){
      alert('Please enter a email');
      return;
    }

    if(this.password == ''){
      alert('Please enter a password');
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }
}
