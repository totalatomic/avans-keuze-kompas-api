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
  async findById(userId: number): Promise<any> {
    const userRepository = new UserRepositoryMongoDB();
    return await userRepository.findById(userId);
  }
  async setRecommendations(userId: string, recommendations: any) {
    const userRepository = new UserRepositoryMongoDB();
    await userRepository.setRecommendations(userId, recommendations);
  }
}