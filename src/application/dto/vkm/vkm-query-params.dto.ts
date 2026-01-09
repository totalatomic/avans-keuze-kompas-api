import { ApiProperty } from "@nestjs/swagger";
export class VkmQueryParamsDto {
  @ApiProperty() readonly search?: string;
}