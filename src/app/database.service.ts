import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs/operators';
import { UserSignup } from './models/userSignup.model';

import firebase from 'firebase/compat/app';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from './models/user.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Blog } from './models/blog.model';
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
  ) { }

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

  saveBlogPost(blog: Blog) {
    var userID = this.authService.user.value.uid;
    var blogRef = this.database.list('posts')
    blogRef
      .push({ ...blog, uid: userID })
      .then((response: any) => {
        console.log(response._delegate.key);
        this.database.object('users/' + userID + '/userPosts/' + response._delegate.key).set(true);
        this.database.object('date/' + this.getToday() + "/" + response._delegate.key).set(true);
        this.database.object('likes/' + response._delegate.key + "/" + userID).set(true)
      });

  }

  getUserPosts(userID) {
    this.database
      .object('users/' + userID + '/userPosts')
      .valueChanges()
      .pipe(take(1))
      .subscribe({
        next:
          ((data: object) => {
            var userPosts: Blog[] = [];
            for (let key in data) {
              userPosts.push(data[key]);
            }
            return userPosts
          })
        , error: (
          (error: any) => { })
      })
  }

  getMostPopularPosts() {
    var popularPosts= [];
    this.database.object('likes').valueChanges().subscribe({
      next: (response: Object) => {
        console.log(response);
        for (var key in response) {
          var popularPost: string = response[key];
          popularPosts.push({popularPost : Object.keys(response[key]).length})
          console.log(key)
            console.log(Object.keys(response[key]).length)
        }
        popularPosts.sort((a,b)=> a[1] - b[1]);
        console.log(popularPosts)
      }
    })
  }

  getToday() {
    return new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()).getTime();
  }

  signUp(userSignup: UserSignup) {
    return this.authService.createUser(userSignup)
      .then(() => {
        this.writeUserData(userSignup);
        // this.router.navigate(['/home']);
      });
  }


}
