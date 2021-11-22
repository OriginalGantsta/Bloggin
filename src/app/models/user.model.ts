export class User {
  firstName: string;
  lastName: string;
  email: string;
  uid: string | Promise<string>;
  constructor(
  firstName: string,
  lastName: string,
  email: string,
  uid: string | Promise<string>){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.uid = uid;
  }
}
