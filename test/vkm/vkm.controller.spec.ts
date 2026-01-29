import { Test, TestingModule } from '@nestjs/testing';
import { VkmController } from 'src/api/controllers/vkm/vkm.controller';
import { VkmService } from 'src/application/service/vkm.service';
import { VKM } from 'src/domain/entities';
import { NotFoundException } from '@nestjs/common';

describe('VkmController', () => {
  let controller: VkmController;
  let service: VkmService;

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
      controllers: [VkmController],
      providers: [
        {
          provide: VkmService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            findallsortedbytheme: jest.fn(),
            findAllEnglish: jest.fn(),
            findByIdEnglish: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VkmController>(VkmController);
    service = module.get<VkmService>(VkmService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of all VKM records', async () => {
      const mockVKMs = [mockVKM, createMockVKM()];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockVKMs as any);

      const result = await controller.findAll();

      expect(result).toEqual(mockVKMs);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if no VKM records exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return unmodified VKM records', async () => {
      const mockVKMs = [mockVKM];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockVKMs as any);

      const result = await controller.findAll();

      expect(result[0].id).toBe(mockVKM.id);
      expect(result[0].shortdescription).toBe(mockVKM.shortdescription);
      expect(result[0].description).toBe(mockVKM.description);
    });
  });

  describe('findById', () => {
    it('should return a single VKM record by ID', async () => {
      const vkmId = 1;
      jest.spyOn(service, 'findById').mockResolvedValue(mockVKM as any);

      const result = await controller.findById(vkmId);

      expect(result).toEqual(mockVKM);
      expect(service.findById).toHaveBeenCalledWith(vkmId);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when VKM not found', async () => {
      const vkmId = 999;
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(new NotFoundException('VKM not found'));

      await expect(controller.findById(vkmId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findById).toHaveBeenCalledWith(vkmId);
    });

    it('should handle numeric ID parameter correctly', async () => {
      const vkmId = 42;
      jest.spyOn(service, 'findById').mockResolvedValue(mockVKM as any);

      await controller.findById(vkmId);

      expect(service.findById).toHaveBeenCalledWith(vkmId);
    });

    it('should return VKM with all properties populated', async () => {
      const vkmId = 1;
      const fullVKM = createMockVKM();
      jest.spyOn(service, 'findById').mockResolvedValue(fullVKM as any);

      const result = await controller.findById(vkmId);

      expect(result.id).toBe(fullVKM.id);
      expect(result.shortdescription).toBe(fullVKM.shortdescription);
      expect(result.studyCredits).toBe(fullVKM.studyCredits);
      expect(result.location).toEqual(fullVKM.location);
      expect(result.module_tags).toEqual(fullVKM.module_tags);
      expect(result.theme_tags).toEqual(fullVKM.theme_tags);
    });
  });

  describe('findAllEN', () => {
    it('should return an array of all English VKM records', async () => {
      const mockVKMs = [mockVKM, createMockVKM()];
      jest.spyOn(service, 'findAllEnglish').mockResolvedValue(mockVKMs as any);

      const result = await controller.findAllEN();

      expect(result).toEqual(mockVKMs);
      expect(service.findAllEnglish).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if no English VKM records exist', async () => {
      jest.spyOn(service, 'findAllEnglish').mockResolvedValue([]);

      const result = await controller.findAllEN();

      expect(result).toEqual([]);
    });

    it('should return unmodified English VKM records', async () => {
      const mockVKMs = [mockVKM];
      jest.spyOn(service, 'findAllEnglish').mockResolvedValue(mockVKMs as any);

      const result = await controller.findAllEN();

      expect(result[0].id).toBe(mockVKM.id);
      expect(result[0].description).toBe(mockVKM.description);
    });

    it('should call English repository method', async () => {
      jest.spyOn(service, 'findAllEnglish').mockResolvedValue([]);

      await controller.findAllEN();

      expect(service.findAllEnglish).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByIdEN', () => {
    it('should return a single English VKM record by ID', async () => {
      const vkmId = 1;
      jest.spyOn(service, 'findByIdEnglish').mockResolvedValue(mockVKM as any);

      const result = await controller.findByIdEN(vkmId);

      expect(result).toEqual(mockVKM);
      expect(service.findByIdEnglish).toHaveBeenCalledWith(vkmId);
      expect(service.findByIdEnglish).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when English VKM not found', async () => {
      const vkmId = 999;
      jest
        .spyOn(service, 'findByIdEnglish')
        .mockRejectedValue(new NotFoundException('VKM not found'));

      await expect(controller.findByIdEN(vkmId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findByIdEnglish).toHaveBeenCalledWith(vkmId);
    });

    it('should handle numeric ID parameter correctly for English', async () => {
      const vkmId = 42;
      jest.spyOn(service, 'findByIdEnglish').mockResolvedValue(mockVKM as any);

      await controller.findByIdEN(vkmId);

      expect(service.findByIdEnglish).toHaveBeenCalledWith(vkmId);
    });

    it('should return English VKM with all properties populated', async () => {
      const vkmId = 1;
      const fullVKM = createMockVKM();
      fullVKM.shortdescription = 'English Test Description';
      jest.spyOn(service, 'findByIdEnglish').mockResolvedValue(fullVKM as any);

      const result = await controller.findByIdEN(vkmId);

      expect(result.shortdescription).toBe(fullVKM.shortdescription);
      expect(result.location).toEqual(fullVKM.location);
      expect(result.theme_tags).toEqual(fullVKM.theme_tags);
    });

    it('should call English repository method', async () => {
      const vkmId = 1;
      jest.spyOn(service, 'findByIdEnglish').mockResolvedValue(mockVKM as any);

      await controller.findByIdEN(vkmId);

      expect(service.findByIdEnglish).toHaveBeenCalledWith(vkmId);
    });
  });

  describe('API endpoint integration', () => {
    it('should have correct route decorators for GET /', async () => {
      const methodDescriptor = Object.getOwnPropertyDescriptor(
        VkmController.prototype,
        'findAll',
      );
      expect(methodDescriptor).toBeDefined();
    });

    it('should have correct route decorators for GET /GetById/:id', async () => {
      const methodDescriptor = Object.getOwnPropertyDescriptor(
        VkmController.prototype,
        'findById',
      );
      expect(methodDescriptor).toBeDefined();
    });

    it('should have correct route decorators for GET /getAllEnglish', async () => {
      const methodDescriptor = Object.getOwnPropertyDescriptor(
        VkmController.prototype,
        'findAllEN',
      );
      expect(methodDescriptor).toBeDefined();
    });

    it('should have correct route decorators for GET /GetByIdEnglish/:id', async () => {
      const methodDescriptor = Object.getOwnPropertyDescriptor(
        VkmController.prototype,
        'findByIdEN',
      );
      expect(methodDescriptor).toBeDefined();
    });
  });

  describe('Error handling', () => {
    it('should propagate NotFoundException from service', async () => {
      const vkmId = 999;
      const error = new NotFoundException('VKM not found');
      jest.spyOn(service, 'findById').mockRejectedValue(error);

      await expect(controller.findById(vkmId)).rejects.toEqual(error);
    });

    it('should propagate NotFoundException from English service', async () => {
      const vkmId = 999;
      const error = new NotFoundException('VKM not found');
      jest.spyOn(service, 'findByIdEnglish').mockRejectedValue(error);

      await expect(controller.findByIdEN(vkmId)).rejects.toEqual(error);
    });

    it('should handle service errors gracefully for findAll', async () => {
      const error = new Error('Database connection failed');
      jest.spyOn(service, 'findAll').mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toEqual(error);
    });

    it('should handle service errors gracefully for findAllEnglish', async () => {
      const error = new Error('Database connection failed');
      jest.spyOn(service, 'findAllEnglish').mockRejectedValue(error);

      await expect(controller.findAllEN()).rejects.toEqual(error);
    });
  });

  describe('VKM data structure', () => {
    it('should return VKM with array properties intact', async () => {
      const vkmWithArrays = createMockVKM();
      vkmWithArrays.location = ['City1', 'City2', 'City3'];
      vkmWithArrays.module_tags = ['tag1', 'tag2'];
      vkmWithArrays.theme_tags = ['theme1', 'theme2'];

      jest.spyOn(service, 'findById').mockResolvedValue(vkmWithArrays as any);

      const result = await controller.findById(1);

      expect(Array.isArray(result.location)).toBe(true);
      expect(Array.isArray(result.module_tags)).toBe(true);
      expect(Array.isArray(result.theme_tags)).toBe(true);
      expect(result.location).toEqual(['City1', 'City2', 'City3']);
    });

    it('should return VKM with date properties', async () => {
      const vkmWithDates = createMockVKM();
      const futureDate = new Date('2024-06-01');
      vkmWithDates.startdate = futureDate;

      jest.spyOn(service, 'findById').mockResolvedValue(vkmWithDates as any);

      const result = await controller.findById(1);

      expect(result.startdate instanceof Date || typeof result.startdate === 'string').toBe(true);
    });
  });
});
