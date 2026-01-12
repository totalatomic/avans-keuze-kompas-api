import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, Req } from '@nestjs/common';
import { RecommendationsService } from 'src/application/service/recommendation.service';
import type { RecommendationDto } from '../../../application/dto/ai/recommendation.dto';
import { QuestionnaireDto } from './dto/questionair.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AI Recommendations')
@Controller('recommendations')
export class RecommendationController {
  constructor(
    private readonly recommendations: RecommendationsService,
  ) { }

  @Post()
  async generate(@Body() body: QuestionnaireDto, @Req() req): Promise<RecommendationDto> {
    const { ...answers } = body;

    return this.recommendations.requestRecommendation(
      req.user.userInfo.id,
      answers,
    );
  }
}
