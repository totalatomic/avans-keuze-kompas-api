import { ApiProperty } from '@nestjs/swagger';

export class QuestionnaireFrontendDto {
  @ApiProperty({ example: 1 })
  questionNumber: number;

  @ApiProperty({ example: 'Creatief bezig zijn' })
  answer: string;

  @ApiProperty({ example: 3, minimum: 1, maximum: 5 })
  rating: number;
}