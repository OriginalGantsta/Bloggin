import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}
  loggedIn: boolean;
  loggedInSubscription: Subscription;

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.loggedIn.subscribe(
      (boolean) => (this.loggedIn = boolean)
    );
  }

  onCreateBlog() {
    this.router.navigate(['submit']);
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }
}
