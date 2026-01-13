import { Body, Controller, Get, Post, Request, Param, UseGuards } from "@nestjs/common";
import { LoginUserDto } from '../../../application/dto/user/login-user.dto';
import { UserDto } from "src/application/dto/user/user.dto";
import { userService } from '../../../application/service/user.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "src/domain/common/decorators/public.decorator";
import { ApiParam, } from "@nestjs/swagger";

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
  @Post('addFavorite/:vkmId')
  @ApiParam({ name: 'vkmId', required: true, description: 'VKM ID' })
  async addFavorite(@Param('vkmId') vkmId: number, @Request() req): Promise<void> {
    return await this.UserService.addFavorite(req.user.userInfo.id, vkmId);
  }
  @Post('addChoice/:vkmId')
  @ApiParam({ name: 'vkmId', required: true, description: 'VKM ID' })
  async addChoice(@Param('vkmId') vkmId: number, @Request() req) {
    return await this.UserService.addChoice(req.user.userInfo.id, vkmId);
  }

}