import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { UserSignup } from './models/userSignup.model';

import firebase from 'firebase/compat/app';
import { async, BehaviorSubject, Subscription } from 'rxjs';
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
  ) {}

  async writeUserData(userSignup: UserSignup) {
    var authUser;
    await this.angularFireAuth.user.pipe(take(1)).subscribe((authUser) => {

      this.authService.user.next({
        firstName: userSignup.firstName,
        lastName: userSignup.lastName,
        email: authUser.email,
        uid: authUser.uid,
      });
      this.database
        .object('users/' + authUser.uid + '/userInfo')
        .set(this.authService.user.value);
    });
  }

  async saveBlogPost(blog: Blog) {
    var userID = await this.authService.user.value.uid;
    var bID = this.database
      .list('users/' + userID + '/userPosts')
      .push(true).key;
    this.database.list('blogs').update(bID, { ...blog, uid: userID, bid: bID });
    this.likeBlog(bID);
    return bID;
  }

  submitBlogEdit(bID: string, blog: Blog) {
    this.database.list('blogs').update(bID, blog);
  }

  signUp(userSignup: UserSignup) {
    return this.authService.createUser(userSignup).then(() => {
      this.writeUserData(userSignup);
      // this.router.navigate(['/home']);
    });
  }

  getMostPopularBlogs(x: number) {
    console.log('getting');
    this.database
      .list('blogs', (ref) => ref.orderByChild('likes').limitToLast(x))
      .valueChanges()
      .subscribe({
        next: (response: Object) => {
          console.log(response);
        },
      });
  }

  getBlogsFromDateRange(startDate: string, endDate?: string) {
    var startOfDate = Date.parse(startDate);
    var endOfDate;
    if (endDate) {
      endOfDate = Date.parse(endDate);
    } else {
      endOfDate = startDate + 1000 * 60 * 60 * 24;
    }
    this.database
      .list('blogs', (ref) =>
        ref.orderByChild('date').startAt(startOfDate).endAt(endOfDate)
      )
      .valueChanges()
      .subscribe({
        next: (response: Object) => {
          console.log(response);
        },
      });
  }

  getRecentBlogs(x, y?) {
    if(!y){
    return this.database
      .list('blogs', (ref) => ref.orderByChild('date').limitToLast(x))
      .valueChanges();}
    else {
      console.log('y exists')
      return this.database
        .list('blogs', (ref) => ref.orderByChild('date').endBefore(y) .limitToLast(x))
        .valueChanges();
    }
  }

  getUserBlogs(userID) {
    console.log('getting ' + userID + ' blogs');
    return this.database
      .object('users/' + userID + '/userPosts')
      .valueChanges()
      .pipe(take(1), mergeMap((async (data: any) => {
        var blogArray;
        await Promise.all(
          Object.keys(data).map(async (bID) => {
            return new Promise((resolve, reject) => {
              this.database
                .object('blogs/' + bID)
                .valueChanges()
                .pipe(take(1))
                .subscribe({
                  next: (data) => {
                    resolve(data);
                  },
                });
            });
          })
        ).then((data) => {console.log(data); blogArray = data});
        return blogArray})))
  }

  getBlog(bID) {
    return this.database
      .object('blogs/' + bID)
      .valueChanges()
      .pipe(
        map((responseData) => {
          responseData['date'] = new Date(
            responseData['date']
          ).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          return responseData;
        })
      );
  }

  likeBlog(bID){
    this.database.object('blogs/' + bID + '/likes/' + this.authService.user.value.uid).set(true);
    this.database
      .object('users/' + this.authService.user.value.uid + '/likedBlogs/' + bID)
      .set(true);
  }
  unlikeBlog(bID){
    this.database.object('blogs/' + bID + '/likes/' + this.authService.user.value.uid).remove();
    this.database
    .object('users/' + this.authService.user.value.uid + '/likedBlogs/' + bID).remove();
  }
}
