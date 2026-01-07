import { VKM } from "../../../domain/entities";

export class UserDto {
  //all of the database fields that you want to expose to the client
  fullName: string;
  email: string
  studentnumber: string;
  isStudent: boolean;
  favoriteVKMs: VKM[];
  enrolledVKMs: VKM[];
  aiReccomendedVKMs: VKM[];
  Token?: string;
}