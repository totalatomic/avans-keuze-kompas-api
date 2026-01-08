export class QuestionnaireDto {
  userId: number;
  questionnaire: Record<number, {
    keuze: string;
    rating: number;
  }>;
}