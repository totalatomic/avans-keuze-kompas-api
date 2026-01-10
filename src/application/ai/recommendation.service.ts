import { Injectable } from '@nestjs/common';
import { userService } from '../service/user.service';
import { AiClientService } from '../../infrastructure/ai/aiClient.service';
import { NotFoundException } from '@nestjs/common';
import { QuestionnaireAnswers } from '../../domain/common/questionairAnswers.dto.js';
import { RecommendationDto } from './dto/recommendation.dto';
import { IQuestionnaire } from '../../domain/interfaces/ai/questionaire.interface.js';


@Injectable()
export class RecommendationsService {
  constructor(
    private readonly aiClient: AiClientService,
    private readonly userService: userService,
  ) {}

  async requestRecommendation(
    userId: string,
    answers: IQuestionnaire,
  ): Promise<RecommendationDto> {

    const aiResults = await this.aiClient.recommend(answers);

    const recommendations: RecommendationDto =
      aiResults.map((r: any) => r.module_id);

    await this.userService.setRecommendations(
      userId,
      recommendations,
    );

    return recommendations;
  }
}
