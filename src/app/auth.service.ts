import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DatabaseService } from './database.service';
import { User } from './models/user.model';
import { UserSignup } from './models/userSignup.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private userSubscription: Subscription;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private database: AngularFireDatabase
  ) {
    this.angularFireAuth.onAuthStateChanged((authUser) => {
      if (authUser != null) {
        this.loggedIn.next(true);
        this.onLoggedIn(authUser);
      } else {
        this.loggedIn.next(false);
        this.onLoggedOut();
      }
    });
  }

  onLoggedIn(authUser) {
    // this.jokeSubscription = this.database
    //   .object('users/' + authUser.uid + '/data' + '/favoriteJokes')
    //   .valueChanges()
    //   .subscribe(
    //     (data: object) => {
    //       var newFavoriteJokes: Joke[] = [];
    //       for (let key in data) {
    //         newFavoriteJokes.push(data[key]);
    //       }
    //       this.jokes.next(newFavoriteJokes);
    //     },
    //     (error: any) => this.jokeSubscription.unsubscribe
    //   );
    console.log('running logged in');
    this.userSubscription = this.database
      .object('users/' + authUser.uid + '/userInfo')
      .valueChanges()
      .subscribe({
        next: (authUser: any) => {
          if (authUser != null) {
            this.user.next(authUser);
          }
        },
        error: (error: any) => this.userSubscription.unsubscribe,
      });
  }

  onLoggedOut() {
    this.user.next(new User(null, null, null, null));
  }

  createUser(userSignup: UserSignup) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(userSignup.email, userSignup.password)

  }

  signIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    // .then(() => {
    //   // this.router.navigate(['/home']);
    // })
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.loggedIn.next(false);
      // this.router.navigate(['']);
    });
  }
}
