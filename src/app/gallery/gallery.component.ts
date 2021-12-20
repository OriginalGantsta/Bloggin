import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  blogs: Blog[];


  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getRecentBlogs().subscribe({
      next: (data: Blog[]) => this.blogs = data
    })
  }

}
