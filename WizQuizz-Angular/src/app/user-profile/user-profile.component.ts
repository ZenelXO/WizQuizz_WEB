import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  logOut(){
    sessionStorage.setItem('token', 'false');
  }

  constructor(private firestore : FirestoreService) {}

  ngOnInit(): void {
    
    
  }
}
