import { Body, Controller, Get, Post, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from '../../../application/user/dto/login-user.dto';
import { UserDto } from "src/application/user/dto/user.dto";
import { userService } from '../../../application/user/user.service';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddFavoriteDto } from "src/application/user/dto/add-favorites.dto";


@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private UserService: userService) { }

  @Post('favoriteAdd')
  async addFavorite(@Body() VkmId: number): Promise<void> {
    this.UserService.addFavorite(VkmId, Id);
  }
  @Get('favoritesGet')
  async getFavorites(@Body() user: LoginUserDto): Promise<UserDto | UnauthorizedException> {
    return this.UserService.login(user);
  }
}