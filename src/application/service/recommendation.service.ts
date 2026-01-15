import { Injectable } from '@nestjs/common';
import { userService } from './user.service';
import { AiClientService } from '../../infrastructure/ai/aiClient.service';
import { NotFoundException } from '@nestjs/common';
import { QuestionnaireAnswers } from '../../domain/common/questionairAnswers.dto.js';
import { RecommendationDto } from '../dto/ai/recommendation.dto';
import { IQuestionnaire } from '../../domain/interfaces/ai/questionaire.interface.js';
import { QuestionnaireFrontendDto } from 'src/api/controllers/ai/dto/questionair-frontend.dto';


@Injectable()
export class RecommendationsService {
  constructor(
    private readonly aiClient: AiClientService,
    private readonly userService: userService,
  ) { }

  async requestRecommendation(
    userId: string,
    answers: QuestionnaireFrontendDto[],
  ): Promise<RecommendationDto> {
    const answersAi: IQuestionnaire = {} as IQuestionnaire;
    
    for (const item of answers) {
      answersAi[`q${item.questionNumber}`] = {
        keuze: item.answer,
        rating: item.rating,
      };
    }
    const aiResults = await this.aiClient.recommend(answersAi);

    const recommendations: RecommendationDto =
      aiResults.map((r: any) => r.module_id);

    await this.userService.setRecommendations(
      userId,
      recommendations,
    );

    return recommendations;
  }
}
