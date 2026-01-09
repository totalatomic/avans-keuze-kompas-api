import { Body, Controller, Get, Post, Req, UnauthorizedException } from "@nestjs/common";
import { userService } from 'src/application/service/user.service';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddFavoriteDto } from "src/application/dto/user/add-favorites.dto";
import { AuthService } from "src/infrastructure/auth/auth.service";


@ApiTags('favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private userService: userService, private authService: AuthService) { }

  @Post('favoriteAdd')
  async addFavorite(@Body() VkmId: number, @Req() req): Promise<void> {
    await this.userService.addFavorite(VkmId, req.user.id);
  }
}