import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { RecommendationsService } from 'src/application/ai/recommendation.service';
import type { RecommendationDto } from '../../../application/ai/dto/recommendation.dto';
import { QuestionnaireDto } from './dto/questionair.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AI Recommendations')
@Controller('recommendations')
export class RecommendationController {
  constructor(
    private readonly recommendations: RecommendationsService,
  ) {}

  @Post()
  async generate(@Body() body: QuestionnaireDto): Promise<RecommendationDto> {
    const { userId, ...answers } = body;
    
    return this.recommendations.requestRecommendation(
      userId,
      answers,
    );
  }
}
