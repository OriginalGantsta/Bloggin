import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';
import { UserSignup } from './models/userSignup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(undefined);


  constructor(private angularFireAuth: AngularFireAuth, private databaseService: DatabaseService) { }



signUp(userSignup: UserSignup) {
  return this.angularFireAuth
    .createUserWithEmailAndPassword(userSignup.email, userSignup.password)
    .then(() => {
      this.databaseService.writeUserData(userSignup);
      // this.router.navigate(['/home']);
    });
}

signIn(email: string, password: string) {
  return this.angularFireAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // this.router.navigate(['/home']);
    })
}

logout() {
  this.angularFireAuth.signOut().then(() => {
    this.loggedIn.next(false);
    // this.router.navigate(['']);
  });
}
}
