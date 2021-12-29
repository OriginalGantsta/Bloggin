import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { Blog } from '../models/blog.model';
import { User } from '../models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent implements OnInit {
  titleCharacterCount: number = 0;
  postCharacterCount: number = 0;
  blurbCharacterCount: number = 0;
  imgDescCharacterCount: number= 0;
  user: User;
  userSubscription: Subscription;
  editMode: string = 'false';
  bID: string;
  routeSubscription: Subscription;
  fragmentSubscription: Subscription;

  @ViewChild('form') blogForm: NgForm;

  updateTitleCount(inputLength: number){
    this.titleCharacterCount = inputLength;
  }

  updatePostCount(inputLength: number) {
    this.postCharacterCount = inputLength;
  }
  updateBlurbCount(inputLength: number) {
    this.blurbCharacterCount = inputLength;
  }

  updateImgDescCount(inputLength: number){
    this.imgDescCharacterCount = inputLength;
  }

  onSubmit(form: NgForm) {
    if (this.editMode !== 'true') {
      var blog: Blog = {
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
      var editedBlog: any = {
        title: form.value.title,
        author: this.user.firstName + ' ' + this.user.lastName,
        blurb: form.value.blurb,
        image: form.value.url,
        imageDescription: form.value.imgDesc,
        bodyText: form.value.bodyText,
      };
      console.log('submitting edit');
      this.submitBlogEdit(editedBlog);
    }
  }

  async saveBlog(blog: Blog) {
    this.bID = await this.databaseService.saveBlogPost(blog);
    this.router.navigate(['blogs/' + this.bID])
  }

  submitBlogEdit(blog: Blog) {
    this.databaseService.submitBlogEdit(this.bID, blog);
    this.router.navigate(['blogs/' + this.bID])
  }

  onCancel() {
    console.log(this.route);
    this.location.back()
  }

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.routeSubscription =this.route.queryParams.subscribe((data) => {
      if (data['edit']) {
        this.editMode = data['edit'];
      }
    });
   this.fragmentSubscription = this.route.fragment.subscribe((data) => {
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

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
  }
}
