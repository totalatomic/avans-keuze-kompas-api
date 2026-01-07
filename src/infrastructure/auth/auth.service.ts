import { IAuthInterface } from "../../domain/interfaces";
import { User } from "../../domain/entities";
export class Authservice implements IAuthInterface {
  async GetCurrentUser(): Promise<User | null> {
    // Implementation here
    return null;
  }
  async GetCurrentUserInfo(token: string | undefined): Promise<void> {
    // Implementation here
  }
  async GetCurrentToken(): Promise<string | null> {
    // Implementation here
    return null;
  }
  async GenerateAccessToken(user: User): Promise<string> {
    // Implementation here
    return "";
  }
  async ValidateToken(token: string): Promise<boolean> {
    // Implementation here
    return true;
  }
  async HashPassword(password: string): Promise<string> {
    // Implementation here
    return "";
  }
  async ValidatePassword(password: string, hashedPassword: string): Promise<boolean> {
    // Implementation here
    return true;
  }
}