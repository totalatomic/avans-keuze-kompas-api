import { Body, Controller, Get, Post, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from '../../../application/dto/user/login-user.dto';
import { UserDto } from "src/application/dto/user/user.dto";
import { userService } from '../../../application/service/user.service';
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class userController {
  constructor(private UserService: userService) { }

  @Post('login')
  async loginUser(@Body() user: LoginUserDto): Promise<UserDto | UnauthorizedException> {
    return this.UserService.login(user);
  }
  @Get("recommendations")
  async getRecommendations() {
    let userId = '695e70c4af5eb7b5312242e7';
    return this.UserService.getRecommendations(userId);
  }
  @Get("favorites")
  async getFavorites() {
    let userId = '695e70c4af5eb7b5312242e7';
    return this.UserService.getFavorites(userId);
  }
}