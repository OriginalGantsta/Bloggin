import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { Blog } from '../models/blog.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent implements OnInit {
  maxCharacterLength: number = 1000;
  postCharacterCount: number = 0;
  blurbCharacterCount: number = 0;
  user: User;
  userSubscription: Subscription;
  editMode: string = 'false';
  bID: string;

  @ViewChild('form') blogForm: NgForm;

  updatePostCount(inputlength: number) {
    this.postCharacterCount = inputlength;
  }
  updateBlurbCount(inputlength: number) {
    this.blurbCharacterCount = inputlength;
  }

  onSubmit(form: NgForm) {
    if (this.editMode !== 'true') {
      var blog: any = {
        title: form.value.title,
        author: this.user.firstName + ' ' + this.user.lastName,
        date: Date.now(),
        blurb: form.value.blurb,
        image: form.value.url,
        imageDescription: form.value.imgDesc,
        bodyText: form.value.bodyText,
      };
      this.saveBlog(blog);
      console.log(this.editMode);
    } else if (this.editMode === 'true') {
      var blog: any = {
        title: form.value.title,
        author: this.user.firstName + ' ' + this.user.lastName,
        blurb: form.value.blurb,
        image: form.value.url,
        imageDescription: form.value.imgDesc,
        bodyText: form.value.bodyText,
      };
      console.log('submitting edit');
      this.submitBlogEdit(blog);
    }
  }

  saveBlog(blog: Blog) {
    this.databaseService.saveBlogPost(blog);
  }

  submitBlogEdit(blog: Blog) {
    this.databaseService.submitBlogEdit(this.bID, blog);
  }

  onCancel() {
    console.log(this.authService.user.value);
  }

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.route.queryParams.subscribe((data) => {
      if (data['edit']) {
        this.editMode = data['edit'];
      }
    });
    this.route.fragment.subscribe((data) => {
      if (data) {
        this.bID = data;
        this.databaseService.getBlog(data).subscribe((data) => {
          this.bID = data['bid'];
          console.log(data['bodyText']);
          this.blogForm.setValue({
            title: data['title'],
            blurb: data['blurb'],
            url: data['image'],
            imgDesc: data['imageDescription'],
            bodyText: data['bodyText'],
          });
        });
      }
    });
  }
}
