import { hostViewClassName } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { PlaceholderDirective } from '../helpers/placeholder.directive';
import { HomeComponent } from '../home/home.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sweep',
  templateUrl: './sweep.component.html',
  styleUrls: ['./sweep.component.css'],
})
export class SweepComponent implements OnInit, AfterViewInit {
  @ViewChild('clear') clearComponent: ElementRef;
  @ViewChild('black') blackComponent: ElementRef;
  @ViewChild('brown') brownComponent: ElementRef;
  @ViewChild('element') element: ElementRef;
  @ViewChild(PlaceholderDirective) newElementPlaceholder: PlaceholderDirective;
  @ViewChild('sweepContainer') sweepContainer: ElementRef;
  @ViewChild('innerContainer') innerContainer: ElementRef;

  private closeSub: Subscription;
  one: any = BlogPostComponent;
  two: any = HomeComponent;
  componentRef: ComponentRef<any>;
  @HostListener('window:wheel', ['$event'])
  slowCollapse($event) {
    // this.componentRef.instance.absolute = false;
    if ($event.deltaY > 0) {
      var number = this.one;
      this.clearComponent.nativeElement.hidden = true;
      this.renderer.removeClass(this.clearComponent.nativeElement, 'collapser');
      this.blackComponent.nativeElement.hidden = true;
      this.renderer.removeClass(this.blackComponent.nativeElement, 'collapser');
      this.brownComponent.nativeElement.hidden = true;
      this.renderer.removeClass(this.brownComponent.nativeElement, 'collapser');
      this.clearComponent.nativeElement.hidden = false;
      this.blackComponent.nativeElement.hidden = false;
      this.brownComponent.nativeElement.hidden = false;
      setTimeout(() => {
        this.renderer.addClass(this.clearComponent.nativeElement, 'collapser');
        this.renderer.removeClass(this.clearComponent.nativeElement, 'linear');
      }, 0);
      setTimeout(() => {
        this.renderer.addClass(this.blackComponent.nativeElement, 'collapser');
        this.renderer.removeClass(this.blackComponent.nativeElement, 'ease-in');
      }, 1000);
      setTimeout(() => {
        this.renderer.addClass(this.brownComponent.nativeElement, 'collapser');
        this.renderer.removeClass(this.brownComponent.nativeElement, 'ease-out');
      }, 0);
      setTimeout(() => {
        var hostViewContainerRef = this.newElementPlaceholder.viewContainerRef;
        hostViewContainerRef.clear();

        this.componentRef = hostViewContainerRef.createComponent(number);
      }, 900);
      setTimeout(() => {

        this.componentRef.location.nativeElement.style.position = 'absolute';
        this.componentRef.location.nativeElement.style.top = 0;
      }, 1500);
    } else if ($event.deltaY < 0) {
      var number = this.two;
      // if (this.componentRef.instance.absolute) {
        // this.componentRef.instance.absolute = false;
      // }
      this.renderer.addClass(this.clearComponent.nativeElement, 'linear');
      this.renderer.addClass(this.blackComponent.nativeElement, 'ease-in');
      this.renderer.addClass(this.brownComponent.nativeElement, 'ease-out');
      setTimeout(() => {
        this.renderer.removeClass(
          this.clearComponent.nativeElement,
          'collapser'
        );
      }, 900);
      setTimeout(() => {
        this.renderer.removeClass(
          this.blackComponent.nativeElement,
          'collapser'
        );
      }, 0);
      setTimeout(() => {
        this.renderer.removeClass(
          this.brownComponent.nativeElement,
          'collapser'
        );
      }, 900);
      setTimeout(() => {
        var hostViewContainerRef = this.newElementPlaceholder.viewContainerRef;
        hostViewContainerRef.clear();

        this.componentRef = hostViewContainerRef.createComponent(number);
      }, 600);
      setTimeout(() => {

        this.componentRef.location.nativeElement.style.position = 'absolute';
        this.componentRef.location.nativeElement.style.top = 0;
      }, 800);
    }

    // setTimeout(()=>{
  }
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    setTimeout(() => {
      const hostViewContainerRef = this.newElementPlaceholder.viewContainerRef;
      hostViewContainerRef.clear();
     let componentRef =hostViewContainerRef.createComponent(HomeComponent)
     this.componentRef = componentRef;
     componentRef.location.nativeElement.style.position = 'absolute';
     componentRef.location.nativeElement.style.top = 0;
      // this.componentRef.location.nativeElement.style.position = 'absolute';
      // this.componentRef.location.nativeElement.instance.style.top = 0;
      // this.renderer.setStyle(this.componentRef.location.nativeElement, 'position', 'absolute')
      // this.renderer.addClass(this.componentRef.location.nativeElement, 'position')
      // this.closeSub = componentRef.instance.close.subscribe(()=>{

      //   this.closeSub.unsubscribe
      //   hostViewContainerRef.clear();
      // })
    }, 1);
  }

  onSignUp() {}

  ngAfterViewInit() {
    // this.slowCollapse()
  }
}
