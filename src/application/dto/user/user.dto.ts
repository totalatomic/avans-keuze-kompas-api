import { VKM } from "../../../domain/entities";
import { UserSchemaDto } from "./user.schema.dto";

export class UserDto {
  //all of the database fields that you want to expose to the client
  fullName: string;
  email: string
  studentnumber: string;
  isStudent: boolean;
  favoriteVKMs: number[];
  enrolledVKMs: number[];
  aiReccomendedVKMs: number[];
  Token?: string;
  fontsize: number;
  darkmode: boolean;
  language: string;
  constructor(data?: Partial<UserSchemaDto>) {
    this.fullName = data?.first_name ?? "";
    this.email = data?.email ?? "";
    this.studentnumber = data?.student_number ?? "";
    this.isStudent = data?.isStudent ?? false;
    this.favoriteVKMs = data?.favorite_vkms ?? [];
    this.enrolledVKMs = data?.enrolled_vkms ?? [];
    this.aiReccomendedVKMs = data?.ai_reccomended_vkms ?? [];
    this.fontsize = data?.text_size ?? 100;
    this.darkmode = data?.dark_mode ?? true;
    this.language = data?.language ?? "nederlands";
  }
}