import { RecommendationsService } from 'src/application/service/recommendation.service';

describe('RecommendationsService', () => {
  let aiClientMock: {
    recommend: jest.Mock;
    isReady: jest.Mock;
  };
  let userServiceMock: {
    setRecommendations: jest.Mock;
  };
  let service: RecommendationsService;

  beforeEach(() => {
    aiClientMock = {
      recommend: jest.fn(),
      isReady: jest.fn(),
    };
    userServiceMock = {
      setRecommendations: jest.fn(),
    } as any;

    service = new RecommendationsService(aiClientMock as any, userServiceMock as any);
  });

  it('transforms frontend answers, calls aiClient.recommend, saves and returns recommendations', async () => {
    const userId = 'user-123';
    const answers = [
      { questionNumber: 1, answer: 'A', rating: 5 },
      { questionNumber: 3, answer: 'B', rating: 2 },
    ] as any;

    aiClientMock.recommend.mockResolvedValue([
      { module_id: 10 },
      { module_id: 20 },
    ]);

    const result = await service.requestRecommendation(userId, answers);

    expect(aiClientMock.recommend).toHaveBeenCalledTimes(1);
    expect(aiClientMock.recommend).toHaveBeenCalledWith({
      q1: { keuze: 'A', rating: 5 },
      q3: { keuze: 'B', rating: 2 },
    });

    expect(userServiceMock.setRecommendations).toHaveBeenCalledWith(userId, [10, 20]);
    expect(result).toEqual([10, 20]);
  });

  it('calls aiClient.recommend with empty object when no answers provided', async () => {
    const userId = 'user-empty';
    const answers: any[] = [];

    aiClientMock.recommend.mockResolvedValue([]);

    const result = await service.requestRecommendation(userId, answers);

    expect(aiClientMock.recommend).toHaveBeenCalledWith({});
    expect(userServiceMock.setRecommendations).toHaveBeenCalledWith(userId, []);
    expect(result).toEqual([]);
  });

  it('propagates errors from aiClient.recommend', async () => {
    const userId = 'user-err';
    const answers = [{ questionNumber: 2, answer: 'X', rating: 1 }] as any;

    const error = new Error('ai failed');
    aiClientMock.recommend.mockRejectedValue(error);

    await expect(service.requestRecommendation(userId, answers)).rejects.toThrow('ai failed');
    expect(userServiceMock.setRecommendations).not.toHaveBeenCalled();
  });

  it('isReady delegates to aiClient.isReady', async () => {
    aiClientMock.isReady.mockResolvedValue(undefined);
    await expect(service.isReady()).resolves.toBeUndefined();
    expect(aiClientMock.isReady).toHaveBeenCalledTimes(1);
  });

  it('isReady propagates rejection from aiClient.isReady', async () => {
    const err = new Error('not ready');
    aiClientMock.isReady.mockRejectedValue(err);
    await expect(service.isReady()).rejects.toThrow('not ready');
  });
});