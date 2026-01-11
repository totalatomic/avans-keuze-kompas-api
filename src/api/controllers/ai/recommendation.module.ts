import { Module } from '@nestjs/common';
import { RecommendationController } from './recommendation.controller';
import { AiClientService } from '../../../infrastructure/ai/aiClient.service';
import { RecommendationsService } from '../../../application/service/recommendation.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RecommendationController],
  providers: [
    AiClientService,
    RecommendationsService,
  ],
})
export class RecommendationModule { }