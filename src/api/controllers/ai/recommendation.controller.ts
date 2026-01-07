import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';

@Controller('recommendations')
export class RecommendationController {
  constructor(
    private readonly generateRecommendations: GenerateRecommendationsService,
  ) {}

  @Post()
  async generate(@Body() body: { userId: string }) {
    // Controller is only a wrapper
    return this.generateRecommendations.execute(body.userId);
  }
}
