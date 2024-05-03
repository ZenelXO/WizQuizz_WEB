import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { User } from '../data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private userCollection : AngularFirestoreCollection<User>;

  constructor(private firestore : AngularFirestore, private router : Router) {
    this.userCollection = this.firestore.collection<User>('users');
  }
  
  addUser(user: User){
    this.userCollection.doc(user.uid).set(user);
  }

  retrieveUser(uid : string){
    
  }
}
