import { Injectable, HttpException } from '@nestjs/common';
import { IQuestionnaire } from '../../domain/interfaces/ai/questionaire.interface.js';
import { ConfigService } from '@nestjs/config/dist/index.js';

@Injectable()
export class AiClientService {
constructor(private readonly configService: ConfigService) {
  this.baseUrl = this.configService.get<string>('AI_BASE_URL_PROD') || 'http://localhost:8001';   // AI_BASE_URL_PROD online url 
}                                                                                                 
private readonly baseUrl: string;
  async recommend(questionnaire: IQuestionnaire) {
    const response = await fetch(`${this.baseUrl}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionnaire),
    });

    if (400 === response.status) {
      const text = await response.text();
      throw new HttpException(
        `AI service error: ${text}`,
        response.status,
      );
    }

    if (422 === response.status) {
      const text = "Wrong format error";
      throw new HttpException(
        `AI service error: ${text}`,
        response.status,
      );
    }

    return response.json();
  }
  async isReady(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/ready`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`AI not ready: ${response.status}`);
    }
  }
}