import { LoginUserDto, LoginUserResDto } from "../dto/user";
import { UserRepositoryMongoDB } from "../../infrastructure/repositories/user.repository.mongodb";
import { UserDto } from "../dto/user/user.dto";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../../infrastructure/auth/auth.service";
import { User } from '../../domain/entities/user.entity';
import { UserSchemaDto } from '../dto/user/user.schema.dto';
import { AddFavoriteDto } from "../dto/user/add-favorites.dto";
import { VkmRepositoryMongoDB } from "../../infrastructure/repositories/vkm.repository.mongodb";

@Injectable()
export class userService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: UserRepositoryMongoDB,
    @Inject('IvkmRepository')
    private readonly vkmRepository: VkmRepositoryMongoDB,
    @Inject('IAuthInterface')
    private readonly authService: AuthService
  ) { }
  async login(request: LoginUserDto): Promise<UserDto | UnauthorizedException> {
    //take the login dto and see if the user exists
    let user = await this.userRepository.findByEmail(request.email);
    //if not return not found
    if (!user) {
      return new UnauthorizedException('invalid credentials, check your email and password then try again');
    }
    //if yes compare hashed passwords via the auth service
    let match = await this.authService.ValidatePassword(request.password, user.password);
    if (!match) {
      return new UnauthorizedException('invalid credentials, check your email and password then try again');
    }
    //if they match return user dto + token
    let token = await this.authService.GenerateToken(user);
    return this.buildUserDto(user, token);
  }
  async logout(): Promise<void> {
    //end the user session or invalidate the token
    //return a positive response
  }
  async getUser(): Promise<void> {
    //get the user id from the token
    //fetch user data from the repository
    //return user dto
  }
  buildUserDto(resUser: UserSchemaDto, token: string): UserDto {
    let newUserDto = new UserDto(
      resUser
    );
    newUserDto.Token = token;
    return newUserDto
  }
  async addFavorite(VkmId: number, Id: string): Promise<void> {
    const user = await this.userRepository.findByEmail(Id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const vkm = await this.vkmRepository.findById(VkmId);
    if (!vkm) {
      throw new UnauthorizedException('VKM not found');
    }
    await this.userRepository.addFavoriteVKM(Id, VkmId);
  }
}