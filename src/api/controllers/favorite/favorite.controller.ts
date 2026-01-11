import { Body, Controller, Get, Post, Req, UnauthorizedException } from "@nestjs/common";
import { userService } from 'src/application/service/user.service';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/infrastructure/auth/auth.service";
import { type FavoritesDto } from "src/application/dto/favorites/favorites.dto";


@ApiTags('favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private userService: userService, private authService: AuthService) { }

  @Post('favoriteAdd')
  async addFavorite(@Body() favoritesDto: FavoritesDto, @Req() req): Promise<void> {
    let userId = '695e70c4af5eb7b5312242e7';
    await this.userService.addFavorite(userId, favoritesDto);
  }
}