import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { userService } from '../../src/application/service/user.service';

describe('userService', () => {
  let service: userService;
  const mockUserRepo: any = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    DeleteFavoriteVKM: jest.fn(),
    addFavoriteVKM: jest.fn(),
    addChoice: jest.fn(),
    updateChoices: jest.fn(),
    updateSettings: jest.fn(),
    setRecommendations: jest.fn(),
  };
  const mockVkmRepo: any = {
    findById: jest.fn(),
  };
  const mockAuth: any = {
    ValidatePassword: jest.fn(),
    GenerateToken: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new userService(mockUserRepo, mockVkmRepo, mockAuth);
  });

  describe('login', () => {
    it('returns user dto with token on successful login', async () => {
      mockUserRepo.findByEmail.mockResolvedValue({ email: 'a@b.com', password: 'hashed' });
      mockAuth.ValidatePassword.mockResolvedValue(true);
      mockAuth.GenerateToken.mockResolvedValue('tok');
      // avoid depending on UserDto implementation
      jest.spyOn(service, 'buildUserDto').mockImplementation((u: any, t: string) => ({ ...u, token: t } as any));
      const res = await service.login({ email: 'A@B.COM', password: 'pw' } as any);
      expect(res.token).toBe('tok');
      expect(mockAuth.ValidatePassword).toHaveBeenCalledWith('pw', 'hashed');
    });

    it('throws UnauthorizedException when email not found', async () => {
      mockUserRepo.findByEmail.mockResolvedValue(null);
      await expect(service.login({ email: 'x', password: 'y' } as any)).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException on wrong password', async () => {
      mockUserRepo.findByEmail.mockResolvedValue({ email: 'a@b.com', password: 'hashed' });
      mockAuth.ValidatePassword.mockResolvedValue(false);
      await expect(service.login({ email: 'a@b.com', password: 'bad' } as any)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getUser', () => {
    it('returns user dto when user exists', async () => {
      mockUserRepo.findById.mockResolvedValue({ id: 'uid', name: 'u' });
      jest.spyOn(service, 'buildUserDto').mockImplementation((u: any, t: string) => ({ ...u, token: t } as any));
      const res = await service.getUser('uid');
      expect(res.token).toBe('');
    });

    it('throws UnauthorizedException when user not found', async () => {
      mockUserRepo.findById.mockResolvedValue(null);
      await expect(service.getUser('missing')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('addFavorite', () => {
    it('removes favorite if already present', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ favoriteVKMs: [1, 2], chosenVKMs: [] } as any);
      mockUserRepo.DeleteFavoriteVKM.mockResolvedValue(undefined);
      await service.addFavorite('uid', 1);
      expect(mockUserRepo.DeleteFavoriteVKM).toHaveBeenCalledWith('uid', 1);
      expect(mockUserRepo.addFavoriteVKM).not.toHaveBeenCalled();
    });

    it('adds favorite if not present', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ favoriteVKMs: [2], chosenVKMs: [] } as any);
      mockUserRepo.addFavoriteVKM.mockResolvedValue(undefined);
      await service.addFavorite('uid', 1);
      expect(mockUserRepo.addFavoriteVKM).toHaveBeenCalledWith('uid', 1);
    });
  });

  describe('addChoice', () => {
    it('throws when already chosen', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ chosenVKMs: [{ id: 1 }], favoriteVKMs: [] } as any);
      await expect(service.addChoice('uid', 1 as any)).rejects.toThrow(BadRequestException);
    });

    it('throws when exceeds three choices', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ chosenVKMs: [{ id: 1 }, { id: 2 }, { id: 3 }], favoriteVKMs: [] } as any);
      await expect(service.addChoice('uid', 4 as any)).rejects.toThrow(BadRequestException);
    });

    it('throws when vkm does not exist', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ chosenVKMs: [], favoriteVKMs: [] } as any);
      mockVkmRepo.findById.mockResolvedValue(null);
      await expect(service.addChoice('uid', 10 as any)).rejects.toThrow(BadRequestException);
    });

    it('adds choice when valid', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ chosenVKMs: [], favoriteVKMs: [] } as any);
      mockVkmRepo.findById.mockResolvedValue({ id: 10 });
      mockUserRepo.addChoice.mockResolvedValue(undefined);
      await service.addChoice('uid', 10 as any);
      expect(mockUserRepo.addChoice).toHaveBeenCalled();
    });
  });

  describe('updateChoices', () => {
    it('returns updated user dto on success', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ chosenVKMs: [] } as any);
      mockUserRepo.updateChoices.mockResolvedValue({ id: 'uid' });
      jest.spyOn(service, 'buildUserDto').mockImplementation((u: any, t: string) => ({ ...u, token: t } as any));
      const res = await service.updateChoices('uid', []);
      expect(res.fullName).toBe('string');
    });

    it('throws BadRequestException when update fails', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ chosenVKMs: [] } as any);
      mockUserRepo.updateChoices.mockResolvedValue(null);
      await expect(service.updateChoices('uid', [])).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateSettings', () => {
    it('fills missing settings from current user and returns dto', async () => {
      const currUser = { text_size: 12, dark_mode: true, language: 'nl', notifications: false };
      mockUserRepo.findById = mockUserRepo.findById || jest.fn();
      mockUserRepo.findById.mockResolvedValue(currUser);
      mockUserRepo.updateSettings.mockResolvedValue({ id: 'uid', ...currUser });
      jest.spyOn(service, 'buildUserDto').mockImplementation((u: any, t: string) => ({ ...u, token: t } as any));
      const res = await service.updateSettings('uid', {} as any);
      expect(res.fullName).toBe('string');
    });

    it('throws BadRequestException when repository update fails', async () => {
      const currUser = { text_size: 12, dark_mode: true, language: 'nl', notifications: false };
      mockUserRepo.findById.mockResolvedValue(currUser);
      mockUserRepo.updateSettings.mockResolvedValue(null);
      await expect(service.updateSettings('uid', {} as any)).rejects.toThrow(BadRequestException);
    });
  });
});