import { NgForm } from "@angular/forms";

export class UserSignIn {
  email: string;
  password: string;

  constructor (form : NgForm){
    this.email = form.form.value['email'];
    this.password = form.form.value['password'];
    }
}
