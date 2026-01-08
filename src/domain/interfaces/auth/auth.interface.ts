import { User } from "../../../domain/entities";

export interface IAuthInterface {
  GetCurrentUser(): Promise<User | null>;
  GetCurrentUserInfo(token: string | undefined): Promise<void>;
  GetCurrentToken(): Promise<string | null>;
  GenerateToken(user: User): Promise<string>;
  ValidateToken(token: string): Promise<boolean>;
  HashPassword(password: string): Promise<string>;
  ValidatePassword(password: string, hashedPassword: string): Promise<boolean>;
}