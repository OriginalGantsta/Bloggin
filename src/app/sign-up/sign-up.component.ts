import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { UserSignup } from '../models/userSignup.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit, AfterViewChecked {
  userSignup = new UserSignup(null, null, null, null);
  emailInUse: boolean = false;
  invalidPassword: boolean = false;
 @Output() close= new EventEmitter<void>();

@ViewChild('inputContainer') inputContainer: ElementRef;
@ViewChild('emailInput') emailInput: ElementRef;
@ViewChild('passwordInput') passwordInput: ElementRef;

onClose(){
  this.close.emit();
}



  async onSubmit(form: NgForm) {
    this.userSignup.userForm = form;
    this.emailInUse = false;
    this.invalidPassword = false;
    await this.databaseService.signUp(this.userSignup).then(()=>this.close.emit()).catch((error) => {
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
  constructor(private databaseService: DatabaseService, private el: ElementRef) {
  }


  ngOnInit(): void {
  }
  ngAfterViewChecked(){}}
