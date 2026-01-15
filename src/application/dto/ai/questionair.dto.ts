import { QuestionnaireAnswers } from '../../../domain/common/questionairAnswers.dto.js';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionnaireDto {
  @ApiProperty({ type: QuestionnaireAnswers })
  q1: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q2: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q3: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q4: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q5: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q6: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q7: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q8: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q9: QuestionnaireAnswers;

  @ApiProperty({ type: QuestionnaireAnswers })
  q10: QuestionnaireAnswers;
}

export { QuestionnaireAnswers };
