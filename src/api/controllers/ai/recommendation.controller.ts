import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { RecommendationsService } from 'src/application/ai/recommendation.service';
import { QuestionnaireDto } from '../ai/dto/questionair.dto';

@Controller('recommendations')
export class RecommendationController {
  constructor(
    private readonly recommendations: RecommendationsService,
  ) {}

  @Post()
  async generate(@Body() body: QuestionnaireDto) {
    return this.recommendations.requestRecommendation(
      body.userId,
      body.questionnaire,
    );
  }
}
