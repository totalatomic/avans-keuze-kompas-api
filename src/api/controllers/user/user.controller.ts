import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from '../../../application/dto/user/login-user.dto';
import { UserDto } from "src/application/dto/user/user.dto";
import { userService } from '../../../application/service/user.service';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { promises } from "dns";
import { TokenUserDto } from "src/application/dto/user";

@ApiTags('User')
@Controller('user')
export class userController {
  constructor(private UserService: userService) { }

  @Post('login')
  async loginUser(@Body() user: LoginUserDto): Promise<UserDto | UnauthorizedException> {
    return this.UserService.login(user);
  }
  @Post('getTokenInfo')
  async tokenUser(@Body() user: TokenUserDto): Promise<UserDto | UnauthorizedException> {
    this.UserService.getUser(user);
    return new UserDto();
  }
}