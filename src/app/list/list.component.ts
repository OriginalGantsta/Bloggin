import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  userBlogs: Blog[] = [];
  author;

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.route.queryParams.subscribe((params) => {
      if (params['user']){
      this.userBlogs =[];
      this.databaseService.getUserBlogs(params['user']).subscribe(
        (data) =>
          this.userBlogs.push(
            ...data.sort((a, b) => (a.date < b.date ? 1 : -1))
          )
        // data.then(data =>console.log(data))
      );
    }});
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
