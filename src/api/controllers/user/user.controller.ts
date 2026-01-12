import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { LoginUserDto } from '../../../application/dto/user/login-user.dto';
import { UserDto } from "src/application/dto/user/user.dto";
import { userService } from '../../../application/service/user.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "src/domain/common/decorators/public.decorator";

@ApiTags('User')
@Controller('user')
export class userController {
  constructor(private UserService: userService) { }
  @Public()
  @Post('login')
  async loginUser(@Body() user: LoginUserDto): Promise<UserDto> {
    return this.UserService.login(user);
  }
  @Post('getTokenInfo')
  async tokenUser(@Request() req) {
    //logic is handeled in the guard which comes before the controller
    //pipeline goes middleware -> guard(token validation happens here) ->  inteceptor -> pipe -> controller
    return req.user;
  }
  @Get('getUserInfo')
  async getUser(@Request() req) {
    return this.UserService.getUser(req.user.userInfo.id);
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