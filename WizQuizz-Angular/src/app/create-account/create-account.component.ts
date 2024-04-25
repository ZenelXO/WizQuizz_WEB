import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../services/Authentification.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { User } from './User';



@Component({
  selector: 'app-create-account',
  
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  firebaseService = inject(AuthentificationService);
  constructor(private router:Router){
    
  }
  
  form = new FormGroup({
    nicknameInput: new FormControl("", [Validators.required]),
    emailInput: new FormControl("", [Validators.required, Validators.email]),
    passwordInput: new FormControl("", [Validators.required]),
    confirmPasswordInput: new FormControl("", [Validators.required])
  })

  async submit() {
    await this.firebaseService.createAccount(this.form.value as User);
    window.alert("Usuario Creado");
    this.router.navigate(["/sign-in"]);
  }
}
