import { Component, ComponentRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { PlaceholderDirective } from '../helpers/placeholder.directive';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private closeSub: Subscription;

@ViewChild(PlaceholderDirective) userAuthPlaceholder: PlaceholderDirective;
@ViewChild('headerContainer') headerContainer;

windowScrolled: boolean;

  constructor(private databaseService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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

test(){
  console.log('navigating')
  this.router.navigate(['/submit'],);
  console.log(this.route.toString())
}

ngOnDestroy(){
  if(this.closeSub){
  this.closeSub.unsubscribe}
}

@HostListener('window:scroll') onScroll(){
   console.log(this.headerContainer.nativeElement.getBoundingClientRect().top);
  if (this.headerContainer.nativeElement.getBoundingClientRect().top === 8){
  this.windowScrolled = window.scrollY !=0;}
  else {this.windowScrolled = false}
}


}
