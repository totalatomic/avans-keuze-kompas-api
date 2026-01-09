import { User } from "../../../domain/entities";
import { UserSchemaDocument } from "../../../application/dto/user";

export interface IAuthInterface {
  GetCurrentUser(): Promise<User | null>;
  GetCurrentUserInfo(token: string | undefined): Promise<void>;
  GetCurrentToken(): Promise<string | null>;
  GenerateToken(user: UserSchemaDocument): Promise<string>;
  ValidateToken(token: string): Promise<boolean>;
  HashPassword(password: string): Promise<string>;
  ValidatePassword(password: string, hashedPassword: string): Promise<boolean>;
}