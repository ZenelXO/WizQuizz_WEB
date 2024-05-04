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
  private authUser : User | null = null;
  private observable : Subscription;
  public username : string = "";
  public description : string = "";
  public creationDate: string = "";
  public quizzes: string = "";



  constructor(private firestore : FirestoreService, private auth : AuthentificationService) {
    this.observable= this.auth.getAuthState().subscribe(result => {
      this.authUser = result as User;
      console.log(this.authUser);
      
      if(this.authUser !== null) {
        this.firestore.retrieveUser(this.authUser.uid).subscribe(result => {
          console.log(result);
          if(result !== undefined){
            this.username = result.username;
            this.description = result.description;
            this.creationDate = "MEMBER SINCE " + result.creationDate;
            this.quizzes = result.quizzes + "QUIZZES CREATED";
          }

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
