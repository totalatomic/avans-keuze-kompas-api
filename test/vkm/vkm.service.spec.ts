import { Test, TestingModule } from '@nestjs/testing';
import { VkmService } from 'src/application/service/vkm.service';
import { VkmRepositoryMongoDB } from 'src/infrastructure/repositories/vkm.repository.mongodb';
import { VkmRepositoryMongoDB_en } from 'src/infrastructure/repositories/vkm.repository.mongodb_en';
import { VKM } from 'src/domain/entities';
import { NotFoundException } from '@nestjs/common';

describe('VkmService', () => {
  let service: VkmService;
  let vkmRepository: VkmRepositoryMongoDB;
  let vkmRepositoryEn: VkmRepositoryMongoDB_en;

  // Mock data factory
  const createMockVKM = (): VKM => {
    const vkm = new VKM();
    vkm._id = '507f1f77bcf86cd799439011';
    vkm.id = 1;
    vkm.shortdescription = 'Test VKM';
    vkm.description = 'This is a test VKM record';
    vkm.content = 'Detailed content about the VKM';
    vkm.image = 'http://example.com/image.jpg';
    vkm.studyCredits = 6;
    vkm.location = ['Amsterdam', 'Rotterdam'];
    vkm.contactId = 101;
    vkm.level = 'Advanced';
    vkm.learningoutcomes = 'Students will learn X, Y, Z';
    vkm.module_tags = ['web', 'development'];
    vkm.availablespots = 30;
    vkm.startdate = new Date('2024-02-01');
    vkm.theme_tags = ['technology', 'innovation'];
    vkm.createdAt = new Date('2024-01-29');
    vkm.updatedAt = new Date('2024-01-29');
    return vkm;
  };

  const mockVKM = createMockVKM();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VkmService,
        {
          provide: 'IvkmRepository',
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            findallsortedbytheme: jest.fn(),
          },
        },
        {
          provide: 'IvkmRepository_en',
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VkmService>(VkmService);
    vkmRepository = module.get('IvkmRepository');
    vkmRepositoryEn = module.get('IvkmRepository_en');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of all VKM records from repository', async () => {
      const mockVKMs = [mockVKM, createMockVKM()];
      jest.spyOn(vkmRepository, 'findAll').mockResolvedValue(mockVKMs as any);

      const result = await service.findAll();

      expect(result).toEqual(mockVKMs);
      expect(vkmRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no VKM records exist', async () => {
      jest.spyOn(vkmRepository, 'findAll').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(vkmRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should call the correct repository method', async () => {
      jest.spyOn(vkmRepository, 'findAll').mockResolvedValue([]);

      await service.findAll();

      expect(vkmRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return VKM records with all properties', async () => {
      const fullVKM = createMockVKM();
      jest.spyOn(vkmRepository, 'findAll').mockResolvedValue([fullVKM] as any);

      const result = await service.findAll();

      expect(result[0].id).toBe(fullVKM.id);
      expect(result[0].shortdescription).toBe(fullVKM.shortdescription);
      expect(result[0].studyCredits).toBe(fullVKM.studyCredits);
    });
  });

  describe('findById', () => {
    it('should return a VKM record by ID', async () => {
      const vkmId = 1;
      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(mockVKM as any);

      const result = await service.findById(vkmId);

      expect(result).toEqual(mockVKM);
      expect(vkmRepository.findById).toHaveBeenCalledWith(vkmId);
      expect(vkmRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when VKM not found', async () => {
      const vkmId = 999;
      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(null);

      await expect(service.findById(vkmId)).rejects.toThrow(NotFoundException);
      expect(vkmRepository.findById).toHaveBeenCalledWith(vkmId);
    });

    it('should throw NotFoundException with correct message', async () => {
      const vkmId = 999;
      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(null);

      try {
        await service.findById(vkmId);
        fail('Should have thrown NotFoundException');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toContain('VKM not found');
      }
    });

    it('should handle numeric ID parameter correctly', async () => {
      const vkmId = 42;
      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(mockVKM as any);

      await service.findById(vkmId);

      expect(vkmRepository.findById).toHaveBeenCalledWith(vkmId);
    });

    it('should return VKM with all properties intact', async () => {
      const vkmId = 1;
      const fullVKM = createMockVKM();
      fullVKM.id = vkmId;
      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(fullVKM as any);

      const result = await service.findById(vkmId);

      expect(result.id).toBe(fullVKM.id);
      expect(result.shortdescription).toBe(fullVKM.shortdescription);
      expect(result.location).toEqual(fullVKM.location);
      expect(result.theme_tags).toEqual(fullVKM.theme_tags);
    });

    it('should not throw error when VKM is found', async () => {
      const vkmId = 1;
      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(mockVKM as any);

      const result = await service.findById(vkmId);

      expect(result).toBeDefined();
      expect(result).toEqual(mockVKM);
    });

    it('should handle undefined result as not found', async () => {
      const vkmId = 999;
      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(null);

      await expect(service.findById(vkmId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findallsortedbytheme', () => {
    it('should return VKM records sorted by theme', async () => {
      const mockVKMs = [mockVKM, createMockVKM()];
      jest
        .spyOn(vkmRepository, 'findallsortedbytheme')
        .mockResolvedValue(mockVKMs as any);

      const result = await service.findallsortedbytheme();

      expect(result).toEqual(mockVKMs);
      expect(vkmRepository.findallsortedbytheme).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if no VKM records exist', async () => {
      jest.spyOn(vkmRepository, 'findallsortedbytheme').mockResolvedValue([]);

      const result = await service.findallsortedbytheme();

      expect(result).toEqual([]);
    });

    it('should call the correct repository method', async () => {
      jest.spyOn(vkmRepository, 'findallsortedbytheme').mockResolvedValue([]);

      await service.findallsortedbytheme();

      expect(vkmRepository.findallsortedbytheme).toHaveBeenCalledTimes(1);
    });

    it('should maintain theme tag organization', async () => {
      const vkm1 = createMockVKM();
      vkm1.theme_tags = ['technology'];
      const vkm2 = createMockVKM();
      vkm2.theme_tags = ['innovation'];

      jest
        .spyOn(vkmRepository, 'findallsortedbytheme')
        .mockResolvedValue([vkm1, vkm2] as any);

      const result = await service.findallsortedbytheme();

      expect(result).toHaveLength(2);
      expect(result[0].theme_tags).toEqual(['technology']);
      expect(result[1].theme_tags).toEqual(['innovation']);
    });
  });

  describe('findAllEnglish', () => {
    it('should return an array of all English VKM records', async () => {
      const mockVKMs = [mockVKM, createMockVKM()];
      jest.spyOn(vkmRepositoryEn, 'findAll').mockResolvedValue(mockVKMs as any);

      const result = await service.findAllEnglish();

      expect(result).toEqual(mockVKMs);
      expect(vkmRepositoryEn.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no English VKM records exist', async () => {
      jest.spyOn(vkmRepositoryEn, 'findAll').mockResolvedValue([]);

      const result = await service.findAllEnglish();

      expect(result).toEqual([]);
    });

    it('should call the English repository method, not default', async () => {
      jest.spyOn(vkmRepositoryEn, 'findAll').mockResolvedValue([]);
      jest.spyOn(vkmRepository, 'findAll').mockResolvedValue([]);

      await service.findAllEnglish();

      expect(vkmRepositoryEn.findAll).toHaveBeenCalledTimes(1);
      expect(vkmRepository.findAll).not.toHaveBeenCalled();
    });

    it('should return English VKM records with all properties', async () => {
      const enVKM = createMockVKM();
      enVKM.shortdescription = 'English Test Description';
      jest.spyOn(vkmRepositoryEn, 'findAll').mockResolvedValue([enVKM] as any);

      const result = await service.findAllEnglish();

      expect(result[0].shortdescription).toBe('English Test Description');
      expect(result[0].studyCredits).toBe(enVKM.studyCredits);
    });
  });

  describe('findByIdEnglish', () => {
    it('should return a single English VKM record by ID', async () => {
      const vkmId = 1;
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(mockVKM as any);

      const result = await service.findByIdEnglish(vkmId);

      expect(result).toEqual(mockVKM);
      expect(vkmRepositoryEn.findById).toHaveBeenCalledWith(vkmId);
      expect(vkmRepositoryEn.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when English VKM not found', async () => {
      const vkmId = 999;
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(null);

      await expect(service.findByIdEnglish(vkmId)).rejects.toThrow(
        NotFoundException,
      );
      expect(vkmRepositoryEn.findById).toHaveBeenCalledWith(vkmId);
    });

    it('should throw NotFoundException with correct message for English', async () => {
      const vkmId = 999;
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(null);

      try {
        await service.findByIdEnglish(vkmId);
        fail('Should have thrown NotFoundException');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toContain('VKM not found');
      }
    });

    it('should call English repository method, not default', async () => {
      const vkmId = 1;
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(mockVKM as any);
      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(mockVKM as any);

      await service.findByIdEnglish(vkmId);

      expect(vkmRepositoryEn.findById).toHaveBeenCalledWith(vkmId);
      expect(vkmRepository.findById).not.toHaveBeenCalled();
    });

    it('should handle numeric ID parameter correctly for English', async () => {
      const vkmId = 42;
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(mockVKM as any);

      await service.findByIdEnglish(vkmId);

      expect(vkmRepositoryEn.findById).toHaveBeenCalledWith(vkmId);
    });

    it('should return English VKM with all properties intact', async () => {
      const vkmId = 1;
      const enVKM = createMockVKM();
      enVKM.id = vkmId;
      enVKM.shortdescription = 'English Description';
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(enVKM as any);

      const result = await service.findByIdEnglish(vkmId);

      expect(result.id).toBe(enVKM.id);
      expect(result.shortdescription).toBe('English Description');
      expect(result.location).toEqual(enVKM.location);
    });

    it('should handle undefined result as not found for English', async () => {
      const vkmId = 999;
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(null);

      await expect(service.findByIdEnglish(vkmId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should not throw error when English VKM is found', async () => {
      const vkmId = 1;
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(mockVKM as any);

      const result = await service.findByIdEnglish(vkmId);

      expect(result).toBeDefined();
      expect(result).toEqual(mockVKM);
    });
  });

  describe('Repository separation', () => {
    it('should use separate repositories for Dutch and English', async () => {
      jest.spyOn(vkmRepository, 'findAll').mockResolvedValue([]);
      jest.spyOn(vkmRepositoryEn, 'findAll').mockResolvedValue([]);

      await service.findAll();
      await service.findAllEnglish();

      expect(vkmRepository.findAll).toHaveBeenCalledTimes(1);
      expect(vkmRepositoryEn.findAll).toHaveBeenCalledTimes(1);
    });

    it('should not cross-use repositories', async () => {
      const mockVKMDutch = createMockVKM();
      const mockVKMEnglish = createMockVKM();
      mockVKMEnglish.shortdescription = 'English';

      jest.spyOn(vkmRepository, 'findById').mockResolvedValue(mockVKMDutch as any);
      jest.spyOn(vkmRepositoryEn, 'findById').mockResolvedValue(mockVKMEnglish as any);

      const dutchResult = await service.findById(1);
      const englishResult = await service.findByIdEnglish(1);

      expect(dutchResult.shortdescription).toBe(mockVKMDutch.shortdescription);
      expect(englishResult.shortdescription).toBe('English');
    });
  });
});
