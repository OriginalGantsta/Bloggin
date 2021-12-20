import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take, tap } from 'rxjs/operators';
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
    var bID = this.database
      .list('users/' + userID + '/userPosts')
      .push(true).key;
    this.database.list('blogs').update(bID, { ...blog, uid: userID, bid: bID });
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

  getRecentBlogs() {
    return this.database
      .list('blogs', (ref) => ref.orderByChild('date').limitToLast(10))
      .valueChanges()
      .pipe(tap(data => console.log(data)),
        map((responseData) => {
          responseData.map((data) => {
            console.log(data['date']);
            data['date'] = new Date(data['date']).toLocaleDateString(
              undefined,
              { year: 'numeric', month: 'short', day: 'numeric' }
            );
            return data;
          });
          return responseData;
        })
      );
  }

  getUserBlogs(userID) {
    this.database
      .object('users/' + userID + '/userPosts')
      .valueChanges()
      .pipe(take(1))
      .subscribe({
        next: async (data: any) => {
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
          ).then((data) => console.log(data));
        },
        error: (error: any) => {},
      });
  }

  getBlog(bID) {
    return this.database
      .object('blogs/' + bID)
      .valueChanges()
      .pipe(take(1))
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
}
