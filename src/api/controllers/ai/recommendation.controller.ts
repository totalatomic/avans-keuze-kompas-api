import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { RecommendationsService } from 'src/application/ai/recommendation.service';

@Controller('recommendations')
export class RecommendationController {
  constructor(
    private readonly recommendations: RecommendationsService,
  ) {}

  @Post()
  async generate(@Body() body: { userId: string }) {
    // Controller is only a wrapper
    return this.recommendations.execute(body.userId);
  }
}
