import { RecommendationController } from '../../src/api/controllers/ai/recommendation.controller';
import type { RecommendationsService } from '../../src/application/service/recommendation.service';

describe('RecommendationController', () => {
  let controller: RecommendationController;
  let mockService: jest.Mocked<RecommendationsService>;

  beforeEach(() => {
    mockService = {
      requestRecommendation: jest.fn(),
      isReady: jest.fn(),
    } as unknown as jest.Mocked<RecommendationsService>;
    controller = new RecommendationController(mockService);
  });

  it('generate: calls service.requestRecommendation with user id and body and returns recommendations', async () => {
    const body = [{ questionNumber: 1, answer: 'yes', rating: 5 }];
    const req = { user: { userInfo: { id: 'user-123' } } } as any;
    const expected = [101, 202];
    mockService.requestRecommendation.mockResolvedValue(expected as any);

    const result = await controller.generate(body as any, req);

    expect(mockService.requestRecommendation).toHaveBeenCalledWith('user-123', body);
    expect(result).toEqual(expected);
  });

  it('ready: returns ok when ai is ready', async () => {
    mockService.isReady.mockResolvedValue(undefined);

    const result = await controller.ready();

    expect(mockService.isReady).toHaveBeenCalled();
    expect(result).toEqual({ status: 'ok' });
  });

  it('ready: returns waking up message when ai is not ready', async () => {
    mockService.isReady.mockRejectedValue(new Error('not ready'));

    const result = await controller.ready();

    expect(mockService.isReady).toHaveBeenCalled();
    expect(result).toEqual({ status: 'ai still waking up' });
  });
});