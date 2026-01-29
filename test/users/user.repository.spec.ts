import { NotFoundException } from '@nestjs/common';
import { UserRepositoryMongoDB } from 'src/infrastructure/repositories/user.repository.mongodb';

describe('UserRepositoryMongoDB', () => {
  let mockModel: any;
  let repo: UserRepositoryMongoDB;
  const validObjectId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    mockModel = {
      findOne: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      updateOne: jest.fn(),
    };
    repo = new UserRepositoryMongoDB(mockModel as any);
  });

  describe('findById', () => {
    it('returns the user when found', async () => {
      const user = { _id: validObjectId, email: 'a@b' };
      mockModel.findOne.mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(user) }));

      const res = await repo.findById(validObjectId);

      expect(res).toBe(user);
      expect(mockModel.findOne).toHaveBeenCalled();
    });

    it('throws NotFoundException when not found', async () => {
      mockModel.findOne.mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(null) }));

      await expect(repo.findById(validObjectId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('returns user when found', async () => {
      const user = { _id: '1', email: 'a@b' };
      mockModel.findOne.mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(user) }));

      const res = await repo.findByEmail('a@b');

      expect(res).toBe(user);
      expect(mockModel.findOne).toHaveBeenCalledWith({ email: 'a@b' });
    });

    it('returns null when not found', async () => {
      mockModel.findOne.mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(null) }));

      const res = await repo.findByEmail('x@y');
      expect(res).toBeNull();
    });
  });

  describe('setRecommendations', () => {
    it('updates recommendations when user exists', async () => {
      mockModel.findByIdAndUpdate.mockResolvedValue({});
      await expect(repo.setRecommendations(validObjectId, [1, 2, 3])).resolves.toBeUndefined();
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    it('throws NotFoundException when update returns null', async () => {
      mockModel.findByIdAndUpdate.mockResolvedValue(null);
      await expect(repo.setRecommendations(validObjectId, [1])).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateSettings', () => {
    it('returns updated document when found', async () => {
      const updated = { _id: validObjectId, text_size: 12 };
      mockModel.findByIdAndUpdate.mockResolvedValue(updated);

      const res = await repo.updateSettings(validObjectId, { fontsize: 12, darkmode: true, language: 'en', notifications: true });
      expect(res).toBe(updated);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    it('returns null when no document found', async () => {
      mockModel.findByIdAndUpdate.mockResolvedValue(null);
      const res = await repo.updateSettings(validObjectId, { fontsize: 12, darkmode: true, language: 'en', notifications: true });
      expect(res).toBeNull();
    });
  });

  describe('mutating updateOne calls', () => {
    it('addFavoriteVKM calls updateOne with $push', async () => {
      mockModel.updateOne.mockResolvedValue({});
      await repo.addFavoriteVKM(validObjectId, 42);
      expect(mockModel.updateOne).toHaveBeenCalledWith(
        expect.any(Object),
        { $push: { favorite_vkms: 42 } }
      );
    });

    it('DeleteFavoriteVKM calls updateOne with $pull', async () => {
      mockModel.updateOne.mockResolvedValue({});
      await repo.DeleteFavoriteVKM(validObjectId, 42);
      expect(mockModel.updateOne).toHaveBeenCalledWith(
        expect.any(Object),
        { $pull: { favorite_vkms: 42 } }
      );
    });

    it('addChoice calls updateOne with $push', async () => {
      const choice = { moduleId: 5 };
      mockModel.updateOne.mockResolvedValue({});
      await repo.addChoice(validObjectId, choice as any);
      expect(mockModel.updateOne).toHaveBeenCalledWith(
        expect.any(Object),
        { $push: { chosen_vkms: choice } }
      );
    });
  });
});
