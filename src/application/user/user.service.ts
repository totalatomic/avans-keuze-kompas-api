import { LoginUserDto } from "./dto";
import { UserRepositoryMongoDB } from "src/infrastructure/repositories/user";

export class userService {
  constructor() { }
  async login(request: LoginUserDto): Promise<void> {

  }
  async logout(): Promise<void> {

  }
  async getUser(): Promise<void> {
    //implementation here
  }
}