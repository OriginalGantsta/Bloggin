import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { Blog } from '../models/blog.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  userBlogs: Blog[] = [];
  noUserBlogs: boolean;
  noUserBlogsMessage: string;

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.route.queryParams.subscribe((params) => {
      if (params['user']) {
        this.userBlogs = [];
        this.databaseService.getUserBlogs(params['user']).subscribe(
          (data) => {
            if (data != null || undefined) {
              this.userBlogs.push(
                ...data.sort((a, b) => (a.date < b.date ? 1 : -1)))
            }
            else {
              this.databaseService.getUserInfo(params['user']).subscribe(
               (userInfo: User) => {
                if (userInfo.uid === this.authService.user.value.uid){
                  this.noUserBlogsMessage = 'You haven\'t written a blog yet!'
                }
                else (this.noUserBlogsMessage = userInfo.firstName + ' hasn\'t written any blogs yet!')}
              )
              this.noUserBlogs = true}
          });
      }
      else { this.router.navigate(['/']) };
    });
  }

  getDate(date) {
    date = new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return date;
  }

  navigateToBlog(bID) {
    this.router.navigate(['/blogs/' + bID]);
  }
}
