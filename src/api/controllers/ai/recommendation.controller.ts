import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, Req } from '@nestjs/common';
import { RecommendationsService } from 'src/application/service/recommendation.service';
import type { RecommendationDto } from '../../../application/dto/ai/recommendation.dto';
import { QuestionnaireFrontendDto } from '../ai/dto/questionair-frontend.dto.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AI Recommendations')
@Controller('recommendations')
export class RecommendationController {
  constructor(
    private readonly recommendations: RecommendationsService,
  ) { }

  @Post()
  async generate(@Body() body: QuestionnaireFrontendDto[], @Req() req): Promise<RecommendationDto> {
    return this.recommendations.requestRecommendation(
      req.user.userInfo.id,
      body,
    );
  }
}
