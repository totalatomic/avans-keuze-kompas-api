import { LoginUserDto, LoginUserResDto, TokenUserDto } from "../dto/user";
import { UserRepositoryMongoDB } from "../../infrastructure/repositories/user.repository.mongodb";
import { UserDto } from "../dto/user/user.dto";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../../infrastructure/auth/auth.service";
import { User } from '../../domain/entities/user.entity';
import { UserSchemaDto } from '../dto/user/user.schema.dto';
import request from 'supertest';

@Injectable()
export class userService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: UserRepositoryMongoDB,
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
  async getUser(request: TokenUserDto): Promise<void> {
    //get the user id from the token
    let user = await this.authService.GetCurrentUserInfo(request.token);
    //fetch user data from the repository
    //return user dto
    //return this.buildUserDto(user, request.token);
  }
  buildUserDto(resUser: UserSchemaDto, token: string): UserDto {
    let newUserDto = new UserDto(
      resUser
    );
    newUserDto.Token = token;
    return newUserDto
  }
}