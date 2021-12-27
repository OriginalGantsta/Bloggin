import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first, map, subscribeOn, Subscription, take } from 'rxjs';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { Blog } from '../models/blog.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit, OnDestroy {
  blog: Blog;
  absolute: boolean = false;
  blogSubscription: Subscription;
  user: User;
  userSubscription: Subscription;
  loggedInSubscription: Subscription;
  editable: boolean;
  blogLiked: boolean;
  test = {};

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(Object.keys(this.test).length);
    await new Promise(
      (resolve) =>
        (this.loggedInSubscription = this.authService.loggedIn.subscribe(
          (status) => {
            if (status != null) {
              resolve(null);
            }
          }
        ))
    );
    this.loggedInSubscription.unsubscribe();
    this.userSubscription = await this.authService.user.subscribe(
      (user) => (this.user = user)
    );
    this.blogSubscription = this.route.paramMap.subscribe((params) => {
      this.databaseService
        .getBlog(params.get('bID'))
        .subscribe((blog: any) => {
          if (this.authService.loggedIn.value === true) {
            if (blog.uid === this.user.uid) {
              this.editable = true;
            }
          }
          this.blog = blog;
          if(blog.likes){
          if (blog.likes.hasOwnProperty(this.user.uid)) {
            this.blogLiked = true;
          }}
          else {this.blogLiked= false}

          if (!this.route.snapshot.params['title']) {
            this.location.replaceState(
              this.router
                .createUrlTree([], { relativeTo: this.route })
                .toString() +
                '/' +
                this.blog.title
                  .replace(/[^a-zA-Z0-9\s]/g, '')
                  .replace(/ /g, '-')
            );
          }
        });
    });
  }

  likeBlog() {
    if(this.blogLiked === false){
    this.databaseService.likeBlog(this.blog.bid)}
    else {this.databaseService.unlikeBlog(this.blog.bid)}
  }

  editBlog() {
    this.router.navigate(['submit'], {
      queryParams: { edit: true },
      fragment: this.blog.bid,
    });
  }

  getUsersBlogs(){
    this.router.navigate(['/list'], {queryParams: {user: this.blog.uid}})
        // this.databaseService.getUserBlogs(this.blog.uid)
  }

  ngOnDestroy(): void {
    this.blogSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
