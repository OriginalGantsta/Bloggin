import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DatabaseService } from '../database.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  blog: Blog;
  absolute: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.databaseService
      .getBlog(this.route.snapshot.params['bID'])
      .subscribe((blog: any) => {
        console.log(blog.bodyText);
        this.blog = blog;
        console.log(this.blog)
        if (!this.route.snapshot.params['title']) {
          this.location.replaceState(
            this.router
              .createUrlTree([], { relativeTo: this.route })
              .toString() +
              '/' +
              this.blog.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/ /g, '-')
          );
        }
      });
  }
}
