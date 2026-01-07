import { BaseEntity } from "../common";

export class User extends BaseEntity {
  firstname: string;
  middlename: string;
  lastname: string;
  studentnumber: string;
  email: string;
  password: string;
  isStudent: boolean;
  favoriteVKMIds: number[];
  enrolledVKMIds: number[];
  aiReccomendedVKMIds: number[];

  getFullName(): string {
    return `${this.firstname} ${this.middlename} ${this.lastname}`
  }
}