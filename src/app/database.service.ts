import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs/operators';
import { UserSignup } from './models/userSignup.model';

import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { AngularFireDatabase } from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private angularFireAuth: AngularFireAuth, private database: AngularFireDatabase) { }
  async writeUserData(userSignup: UserSignup)
  {
    await this.angularFireAuth.user.pipe(take(1)).subscribe((authUser) => {
      this.user.next({
        firstName: userSignup.firstName,
        lastName: userSignup.lastName,
        email: authUser.email,
        uid: authUser.uid,
      });
      this.database
        .object('users/' + authUser!.uid + '/userInfo')
        .set(this.user.value);
    });
  }
}
