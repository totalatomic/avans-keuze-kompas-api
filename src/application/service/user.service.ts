import { LoginUserDto, LoginUserResDto, TokenUserDto } from "../dto/user";
import { UserRepositoryMongoDB } from "../../infrastructure/repositories/user.repository.mongodb";
import { UserDto } from "../dto/user/user.dto";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../../infrastructure/auth/auth.service";
import { RecommendationDto } from "../dto/ai/recommendation.dto";
import { User } from '../../domain/entities/user.entity';
import { QuestionnaireAnswers } from "../../domain/common/questionairAnswers.dto";
import { UserSchemaDto } from '../dto/user/user.schema.dto';
import { VkmRepositoryMongoDB } from "../../infrastructure/repositories/vkm.repository.mongodb";
import { FavoritesDto } from "../dto/favorites/favorites.dto";

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
  async login(request: LoginUserDto): Promise<UserDto> {
    //take the login dto and see if the user exists
    let user = await this.userRepository.findByEmail(request.email);
    //if not return not found
    if (!user) {
      throw new UnauthorizedException('invalid credentials, check your email and password then try again');
    }
    //if yes compare hashed passwords via the auth service
    let match = await this.authService.ValidatePassword(request.password, user.password);
    if (!match) {
      throw new UnauthorizedException('invalid credentials, check your email and password then try again');
    }
    //if they match return user dto + token
    let token = await this.authService.GenerateToken(user);
    return this.buildUserDto(user, token);
  }
  async logout(): Promise<void> {
    //end the user session or invalidate the token
    //return a positive response
  }
  async getUser(user_id: string): Promise<UserDto> {
    let user = await this.userRepository.findById(user_id)
    //fetch user data from the repository
    //return user dto
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.buildUserDto(user, '');
  }
  async getRecommendations(userId: string): Promise<any> {
    return await this.userRepository.getAiReccomendedVKMs(userId);
  }
  async findById(userId: string): Promise<any> {
    return await this.userRepository.findById(userId);
  }
  async setRecommendations(userId: string, RecommendationDto: RecommendationDto) {
    await this.userRepository.setRecommendations(userId, RecommendationDto);
  }
  buildUserDto(resUser: UserSchemaDto, token: string): UserDto {
    let newUserDto = new UserDto(
      resUser
    );
    newUserDto.Token = token;
    return newUserDto
  }
  async addFavorite(userId: string, favoritesDto: FavoritesDto): Promise<void> {
    await this.userRepository.addFavoriteVKM(userId, favoritesDto);
  }
  async getFavorites(userId: string): Promise<any> {
    return await this.userRepository.getFavoriteVKMs(userId);
  }
}