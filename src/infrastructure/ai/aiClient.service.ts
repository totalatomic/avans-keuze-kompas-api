import { Injectable, HttpException } from '@nestjs/common';
import { IQuestionnaire } from '../../domain/interfaces/ai/questionaire.interface.js';

@Injectable()
export class AiClientService {
  private readonly baseUrl = 'http://localhost:8001';

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
}