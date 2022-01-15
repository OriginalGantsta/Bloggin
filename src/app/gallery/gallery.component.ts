import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];
  blogsPreload: Blog[] = [];
  blogsToLoad: boolean = true;
  loggedIn: boolean;
  loggedInSubscription: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private authService: AuthService
  ) {}

  getDate(date) {
    date = new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return date;
  }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.loggedIn.subscribe({
      next: (boolean) => this.loggedIn = boolean
    })
    this.databaseService
      .getRecentBlogs(10)
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          this.blogs.push(
            ...data.sort((a, b) =>
              Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
            )
          );
          this.databaseService
            .getRecentBlogs(10, this.blogs[this.blogs.length - 1].date)
            .pipe(take(1))
            .subscribe({
              next: (data: any) =>{
                this.blogsPreload.push(
                  ...data.sort((a, b) =>
                    Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
                  )
                )
                if (this.blogsPreload.length === 0) {
                  this.blogsToLoad = false;
                }},
            });
        },
      });
  }

  navigateToBlog(bID) {
    this.router.navigate(['/blogs/' + bID]);
  }


  async loadMoreBlogs() {
    this.blogs.push(...this.blogsPreload);
    this.blogsPreload = [];
    await this.databaseService
      .getRecentBlogs(10, this.blogs[this.blogs.length - 1].date)
      .pipe(take(1))
      .subscribe({
        next: (data: any) =>
          this.blogsPreload.push(
            ...data.sort((a, b) =>
              a.date < b.date ? 1 : -1
            )
          ),
      });
    if (this.blogsPreload.length === 0) {
      this.blogsToLoad = false;
    }
  }

  ngOnDestroy(): void {
      this.loggedInSubscription.unsubscribe()
  }
}
