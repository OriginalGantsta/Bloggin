import { NgForm } from "@angular/forms";

export class UserSignup {

  public set userForm(form : NgForm) {
    this.firstName = form.form.value['firstName'];
    this.lastName = form.form.value['lastName'];
    this.email = form.form.value['email'];
    this.password = form.form.value['password'];
  }

  constructor ( public firstName: string,
    public lastName: string,
    public email: string,
    public password: string){
    }
}
