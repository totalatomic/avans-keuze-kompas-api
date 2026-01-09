import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class QuestionnaireAnswers {
  @ApiProperty({ example: 'Helping others' }) 
  keuze: string;
  @ApiProperty({ example: 3, minimum: 1, maximum: 5 })
  rating: number;
}
