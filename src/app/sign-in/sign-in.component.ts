import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserSignIn } from '../models/userSignIn.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  invalidSignIn: boolean = false;
@Output() close= new EventEmitter<void>();

onClose(){
  this.close.emit();
}
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.invalidSignIn = false;
    var loginUser = new UserSignIn(form);
    this.authService.signIn(loginUser.email, loginUser.password).then(()=>this.close.emit()).catch(() => {
      this.invalidSignIn = true;
      form.reset();
    });
  }
}
