import { Component, ComponentRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { AuthService } from '../auth.service';
import { PlaceholderDirective } from '../helpers/placeholder.directive';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private closeSub: Subscription;

@ViewChild(PlaceholderDirective) userAuthPlaceholder: PlaceholderDirective;
@ViewChild('headerContainer') headerContainer;

loggedIn: boolean;
windowScrolled: boolean;
user: User;
loggedInSubscription: Subscription;
userSubscription: Subscription;

  constructor(private databaseService: DatabaseService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
   this.loggedInSubscription= this.authService.loggedIn.subscribe((boolean) => this.loggedIn = boolean);
   this.userSubscription= this.authService.user.subscribe((user) => this.user = user)
  }

onSignUp(){
  const hostViewContainerRef = this.userAuthPlaceholder.viewContainerRef;
  hostViewContainerRef.clear();

  const componentRef = hostViewContainerRef.createComponent(SignUpComponent);
  this.closeSub = componentRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe
    hostViewContainerRef.clear();
  })
}

onSignIn(){
  const hostViewContainerRef = this.userAuthPlaceholder.viewContainerRef;
  hostViewContainerRef.clear();

  const componentRef = hostViewContainerRef.createComponent(SignInComponent);
  this.closeSub = componentRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe
    hostViewContainerRef.clear();
  })
}

onSignOut(){
  this.authService.logout()
}

test(){
  // console.log(this.loggedIn, this.user, this.authService.user)
  this.router.navigate(['/'],);
  // console.log(this.route.toString())
}

ngOnDestroy(){
  if(this.closeSub){
  this.closeSub.unsubscribe()};
  this.userSubscription.unsubscribe();
  this.loggedInSubscription.unsubscribe();
}

@HostListener('window:scroll') onScroll(){
  //  console.log(this.headerContainer.nativeElement.getBoundingClientRect().top);
  //  console.log(window.scrollY);
  if (this.headerContainer.nativeElement.getBoundingClientRect().top === 8 && window.scrollY !=0){
  this.windowScrolled = true;}
  else {this.windowScrolled = false}
}

goToUserBlogs(){
  this.router.navigate(['/list'], {queryParams: {user: this.user.uid}})
}

}
