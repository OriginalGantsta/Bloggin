import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs/operators';
import { UserSignup } from './models/userSignup.model';

import firebase from 'firebase/compat/app';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from './models/user.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { blog } from './models/blog.model';
import { Reference } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {


  constructor(
    private angularFireAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    private authService: AuthService
  ) {}

  async writeUserData(userSignup: UserSignup) {
    await this.angularFireAuth.user.pipe(take(1)).subscribe((authUser) => {
      this.authService.user.next({
        firstName: userSignup.firstName,
        lastName: userSignup.lastName,
        email: authUser.email,
        uid: authUser.uid,
      });
      this.database
        .object('users/' + authUser!.uid + '/userInfo')
        .set(this.authService.user.value);
    });
  }

  saveBlogPost(blog: blog) {
    const itemsRef = this.database.list('posts/' + this.getToday());
    itemsRef
      .push({ ...blog, uid: this.authService.user.value.uid})
      .then((response: any) => console.log(response._delegate.key));
  }

getToday(){
  return new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()).getTime();
}

signUp(userSignup: UserSignup){
  return this.authService.createUser(userSignup)
.then(() => {
  this.writeUserData(userSignup);
  // this.router.navigate(['/home']);
});}


}
