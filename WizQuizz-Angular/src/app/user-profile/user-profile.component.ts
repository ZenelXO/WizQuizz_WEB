import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthentificationService } from '../services/Authentification.service';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  private user : User | null = null;
  private observable : Subscription;

  constructor(private firestore : FirestoreService, private auth : AuthentificationService) {
    this.observable= this.auth.getAuthState().subscribe(result => {
      this.user = result as User;
      console.log(this.user);
      
      if(this.user !== null) {
        this.firestore.retrieveUser(this.user.uid).subscribe(result => {
          console.log(result);
        })
      }

    });

  }

  ngOnInit(): void {

    
    
  }

  logOut(){
    sessionStorage.setItem('token', 'false');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.observable.unsubscribe();
  }
}
