import { BaseEntity } from "../common";
import { VKM } from "./vkm.entity";
import { isEmail, IsEmail } from "class-validator";

export class User extends BaseEntity {
  firstname: string;
  middlename: string;
  lastname: string;
  studentnumber: string;
  email: string;
  password: string;
  isStudent: boolean;
  favoriteVKMs: VKM[];
  enrolledVKMs: VKM[];
  aiReccomendedVKMs: VKM[];

  getFullName(): string {
    return `${this.firstname} ${this.middlename} ${this.lastname}`
  }

}