import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AiClientService } from '../../infrastructure/ai/aiClient.service';

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly userService: UserService,
    private readonly aiClient: AiClientService,
  ) {}

  async execute(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new Error('User not found');

    const recommendations = await this.aiClient.recommend(user.questionnaire);

    await this.userService.setRecommendations(user._id, recommendations);

    return recommendations;
  }
}
