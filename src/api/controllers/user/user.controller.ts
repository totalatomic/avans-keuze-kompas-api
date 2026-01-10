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
  async getRecommendations(@Body() userId: number){
    return this.UserService.getRecommendations(userId);
  }
}