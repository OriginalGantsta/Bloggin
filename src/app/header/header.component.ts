import { Component, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor() { }

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

ngOnDestroy(){
  this.closeSub.unsubscribe
}

}
