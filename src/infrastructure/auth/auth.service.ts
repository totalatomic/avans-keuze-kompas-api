import { IAuthInterface } from "../../domain/interfaces";
import { User } from "../../domain/entities";
import bcrypt from "node_modules/bcryptjs";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EnvConfigModel } from '../env'
import { UserSchemaDocument } from "src/application/dto/user";

@Injectable()
export class AuthService implements IAuthInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvConfigModel>,
  ) { }

  async GetCurrentUser(): Promise<User | null> {
    // Implementation here
    return null;
  }
  async GetCurrentUserInfo(): Promise<object> {
    // Implementation here
    // const res: JwtPayload = this.jwtService.decode(token)
    // console.log(res)
    return {};
  }
  async GetCurrentToken(): Promise<string | null> {
    // Implementation here
    return null;
  }
  async GenerateToken(user: UserSchemaDocument): Promise<string> {
    const accesstoken = await this.jwtService.signAsync({
      userInfo: {
        id: user._id,
        email: user.email,
        username: `${user.first_name} ${user.prefix} ${user.last_name}`,

      }
    })
    return accesstoken;
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
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}