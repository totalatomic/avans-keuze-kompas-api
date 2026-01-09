import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class AddFavoriteDto {
  @ApiProperty() @IsNotEmpty() readonly VkmId: string;
}