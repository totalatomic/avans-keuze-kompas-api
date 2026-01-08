import { Injectable } from '@nestjs/common';
import { userService } from '../user/user.service';
import { AiClientService } from '../../infrastructure/ai/aiClient.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly userService: userService,
    private readonly aiClient: AiClientService,
  ) {}

  async requestRecommendation(
    userId: number,
    questionnaire: Record<number, { keuze: string; rating: number }>,
  ) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const recommendations = await this.aiClient.recommend(
      questionnaire,
    );

    await this.userService.setRecommendations(
      user._id,
      recommendations,
    );

    return recommendations;
  }
}
