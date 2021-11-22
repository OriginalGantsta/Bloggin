import { NgForm } from "@angular/forms";

export class UserSignup {

  public set userForm(form : NgForm) {
    this.firstName = form.form.value['first name'];
    this.lastName = form.form.value['last name'];
    this.email = form.form.value['email'];
    this.password = form.form.value['password'];
  }

  constructor ( public firstName: string,
    public lastName: string,
    public email: string,
    public password: string){
    }
}
