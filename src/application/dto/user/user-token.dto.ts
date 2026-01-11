import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isString } from "class-validator";

export class TokenUserDto {
  @IsNotEmpty() @ApiProperty() readonly token;
}