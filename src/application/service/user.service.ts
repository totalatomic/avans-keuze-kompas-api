import { LoginUserDto, LoginUserResDto, TokenUserDto } from "../dto/user";
import { UserRepositoryMongoDB } from "../../infrastructure/repositories/user.repository.mongodb";
import { UserDto } from "../dto/user/user.dto";
import { BadRequestException, Inject, Injectable, UnauthorizedException, Delete } from '@nestjs/common';
import { AuthService } from "../../infrastructure/auth/auth.service";
import { RecommendationDto } from "../dto/ai/recommendation.dto";
import { User } from '../../domain/entities/user.entity';
import { QuestionnaireAnswers } from "../../domain/common/questionairAnswers.dto";
import { UserSchemaDto } from '../dto/user/user.schema.dto';
import { VkmRepositoryMongoDB } from "../../infrastructure/repositories/vkm.repository.mongodb";
import { ChosenModuleDto } from "../dto/vkm/chosen.vkm";

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
  async getUser(user_id: string): Promise<UserDto> {
    let user = await this.userRepository.findById(user_id)
    //fetch user data from the repository
    //return user dto
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.buildUserDto(user, '');
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
    newUserDto.token = token;
    return newUserDto
  }
  async addFavorite(userId: string, favVkmId: number): Promise<void> {
    let curUser = await this.getUser(userId); //will throw error on incorrect userid
    if (curUser.favoriteVKMs.includes(favVkmId)) { //already favorited
      return await this.userRepository.DeleteFavoriteVKM(userId, favVkmId);
    }
    return await this.userRepository.addFavoriteVKM(userId, favVkmId);
  }
  async addChoice(userId: string, chosenVkmId: number): Promise<void> {
    let curUser = await this.getUser(userId); //will throw error on incorrect userid
    if (curUser.chosenVKMs.find(c => c.id === chosenVkmId)) {
      throw new BadRequestException()//already chosen
    }
    if (curUser.chosenVKMs.length >= 3) {
      throw new BadRequestException()//max reached
    }
    let chosenVkm = new ChosenModuleDto(chosenVkmId, (curUser.chosenVKMs.length + 1));    //build the chosenDTO
    await this.userRepository.addChoice(userId, chosenVkm);
  }
}