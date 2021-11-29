import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { blog } from '../models/blog.model';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
maxCharacterLength: number = 1000;
postCharacterCount: number = 0;
blurbCharacterCount: number = 0;

updatePostCount(inputlength: number){
  this.postCharacterCount = inputlength;
}
updateBlurbCount(inputlength: number){
  this.blurbCharacterCount = inputlength;
}


  onSubmit(form: NgForm){
    var blog:blog= {
      title: form.value.title,
      author: this.authService.user.value.firstName + ' ' + this.authService.user.value.lastName,
      date: Date.now(),
      blurb: form.value.blurb,
      image: form.value.url,
      bodyText: form.value.postInput,
    }
    this.saveBlog(blog)
  }

  saveBlog(blog: blog){
    this.databaseService.saveBlogPost(blog)
  }

onCancel(){
  console.log(this.authService.user.value)
}


  constructor(private databaseService: DatabaseService, private authService: AuthService) { }

  ngOnInit(): void {
  }

}
