import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserSignup } from '../models/userSignup.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit, AfterViewInit {
  userSignup = new UserSignup(null, null, null, null);
  emailInUse: boolean = false;
  invalidPassword: boolean = false;

@ViewChild('form') form: ElementRef;
@ViewChild('emailInput') emailInput: ElementRef;
@ViewChild('passwordInput') passwordInput: ElementRef;

  async onSubmit(form: NgForm) {
    this.userSignup.userForm = form;
    this.emailInUse = false;
    this.invalidPassword = false;
    await this.authService.signUp(this.userSignup).catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        this.emailInUse = true;
        this.emailInput.nativeElement.focus();

      }
      else if (error.code === 'auth/weak-password') {
        this.invalidPassword = true;
        this.passwordInput.nativeElement.focus();
      }
    });
  }

  hasValue(){}
  constructor(private authService: AuthService, private el: ElementRef) {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){

console.log(this.form)
  }
}
