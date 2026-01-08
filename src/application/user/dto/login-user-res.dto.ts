import { ObjectId } from "mongoose";

export class LoginUserResDto {
  constructor(id: string, firstname: string, email: string, password: string, Token?: string) {
    this.id = id;
    this.firstname = firstname;
    // this.middlename = middlename;
    // this.lastname = lastname;
    // this.studentnumber = studentnumber;
    this.email = email;
    // this.isStudent = isStudent;
    this.password = password;
    // this.Token = Token;
  }
  id: string;
  firstname: string;
  middlename: string
  lastname: string;
  studentnumber: string;
  email: string;
  isStudent: boolean;
  password: string;
  Token?: string;

}