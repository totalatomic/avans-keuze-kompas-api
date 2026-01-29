import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { VkmRepositoryMongoDB } from 'src/infrastructure/repositories/vkm.repository.mongodb';
import { VKM } from 'src/domain/entities';

describe('VkmRepositoryMongoDB', () => {
  let repository: VkmRepositoryMongoDB;
  let mockVkmModel: any;

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

  beforeEach(async () => {
    mockVkmModel = {
      find: jest.fn().mockReturnValue({
        exec: jest.fn(),
      }),
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn(),
      }),
      create: jest.fn(),
      aggregate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VkmRepositoryMongoDB,
        {
          provide: getModelToken(VKM.name),
          useValue: mockVkmModel,
        },
      ],
    }).compile();

    repository = module.get<VkmRepositoryMongoDB>(VkmRepositoryMongoDB);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all VKM records from database', async () => {
      const mockVKMs = [createMockVKM(), createMockVKM()];
      const mockExec = jest.fn().mockResolvedValue(mockVKMs);
      mockVkmModel.find.mockReturnValue({
        exec: mockExec,
      });

      const result = await repository.findAll();

      expect(result).toEqual(mockVKMs);
      expect(mockVkmModel.find).toHaveBeenCalledTimes(1);
      expect(mockExec).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no VKM records exist', async () => {
      const mockExec = jest.fn().mockResolvedValue([]);
      mockVkmModel.find.mockReturnValue({
        exec: mockExec,
      });

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });

    it('should call find().exec() on the model', async () => {
      const mockExec = jest.fn().mockResolvedValue([]);
      mockVkmModel.find.mockReturnValue({
        exec: mockExec,
      });

      await repository.findAll();

      expect(mockVkmModel.find).toHaveBeenCalledWith();
      expect(mockExec).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find VKM by numeric ID', async () => {
      const mockVKM = createMockVKM();
      const vkmId = 1;
      const mockExec = jest.fn().mockResolvedValue(mockVKM);
      mockVkmModel.findOne.mockReturnValue({
        exec: mockExec,
      });

      const result = await repository.findById(vkmId);

      expect(result).toEqual(mockVKM);
      expect(mockVkmModel.findOne).toHaveBeenCalledWith({ id: Number(vkmId) });
    });

    it('should return null when VKM not found', async () => {
      const vkmId = 999;
      const mockExec = jest.fn().mockResolvedValue(null);
      mockVkmModel.findOne.mockReturnValue({
        exec: mockExec,
      });

      const result = await repository.findById(vkmId);

      expect(result).toBeNull();
      expect(mockVkmModel.findOne).toHaveBeenCalledWith({ id: Number(vkmId) });
    });

    it('should convert ID to Number type', async () => {
      const vkmId = 42;
      const mockExec = jest.fn().mockResolvedValue(null);
      mockVkmModel.findOne.mockReturnValue({
        exec: mockExec,
      });

      await repository.findById(vkmId);

      expect(mockVkmModel.findOne).toHaveBeenCalledWith({ id: 42 });
    });

    it('should return VKM with all properties', async () => {
      const mockVKM = createMockVKM();
      const mockExec = jest.fn().mockResolvedValue(mockVKM);
      mockVkmModel.findOne.mockReturnValue({
        exec: mockExec,
      });

      const result = await repository.findById(1);

      expect(result).toBeDefined();
      if (result) {
        expect(result.id).toBe(mockVKM.id);
        expect(result.shortdescription).toBe(mockVKM.shortdescription);
        expect(result.studyCredits).toBe(mockVKM.studyCredits);
      }
    });
  });

  describe('create', () => {
    it('should return the VKM item passed in', async () => {
      const mockVKM = createMockVKM();
      mockVkmModel.create.mockResolvedValue(mockVKM);

      const result = await repository.create(mockVKM);

      expect(result).toEqual(mockVKM);
    });

    it('should return the item passed in without calling model', async () => {
      const mockVKM = createMockVKM();

      const result = await repository.create(mockVKM);

      expect(result).toEqual(mockVKM);
      // Note: current implementation just returns the item without persisting
      expect(mockVkmModel.create).not.toHaveBeenCalled();
    });

    it('should accept VKM with all properties', async () => {
      const mockVKM = createMockVKM();
      mockVkmModel.create.mockResolvedValue(mockVKM);

      const result = await repository.create(mockVKM);

      expect(result.shortdescription).toBe(mockVKM.shortdescription);
      expect(result.location).toEqual(mockVKM.location);
      expect(result.theme_tags).toEqual(mockVKM.theme_tags);
    });
  });

  describe('update', () => {
    it('should return null', async () => {
      const vkmId = '507f1f77bcf86cd799439011';
      const updateData = createMockVKM();

      const result = await repository.update(vkmId, updateData);

      expect(result).toBeNull();
    });

    it('should accept string ID and VKM object', async () => {
      const vkmId = '507f1f77bcf86cd799439011';
      const updateData = createMockVKM();

      await repository.update(vkmId, updateData);

      // Verify no errors thrown
      expect(true).toBe(true);
    });
  });

  describe('delete', () => {
    it('should return true', async () => {
      const vkmId = '507f1f77bcf86cd799439011';

      const result = await repository.delete(vkmId);

      expect(result).toBe(true);
    });

    it('should accept string ID', async () => {
      const vkmId = '507f1f77bcf86cd799439011';

      const result = await repository.delete(vkmId);

      expect(result).toBe(true);
    });
  });

  describe('findbyName', () => {
    it('should return null', async () => {
      const name = 'Test VKM';

      const result = await repository.findbyName(name);

      expect(result).toBeNull();
    });

    it('should accept string name parameter', async () => {
      const name = 'Test VKM';

      const result = await repository.findbyName(name);

      expect(result).toBeNull();
    });
  });

  describe('findbyTag', () => {
    it('should return empty array', async () => {
      const tag = 'web';

      const result = await repository.findbyTag(tag);

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should accept string tag parameter', async () => {
      const tag = 'development';

      const result = await repository.findbyTag(tag);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findbyLevel', () => {
    it('should return empty array', async () => {
      const level = 'Advanced';

      const result = await repository.findbyLevel(level);

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should accept string level parameter', async () => {
      const level = 'Beginner';

      const result = await repository.findbyLevel(level);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findbyLocation', () => {
    it('should return empty array', async () => {
      const location = 'Amsterdam';

      const result = await repository.findbyLocation(location);

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should accept string location parameter', async () => {
      const location = 'Rotterdam';

      const result = await repository.findbyLocation(location);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findbystudyCredits', () => {
    it('should return empty array', async () => {
      const studyCredits = 6;

      const result = await repository.findbystudyCredits(studyCredits);

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should accept numeric study credits parameter', async () => {
      const studyCredits = 12;

      const result = await repository.findbystudyCredits(studyCredits);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findallsortedbytheme', () => {
    it('should return aggregation result from MongoDB', async () => {
      const mockAggregationResult = [
        {
          theme: 'technology',
          count: 2,
          modules: [createMockVKM()],
        },
      ];
      mockVkmModel.aggregate.mockReturnValue(mockAggregationResult);

      const result = await repository.findallsortedbytheme();

      expect(result).toEqual(mockAggregationResult);
    });

    it('should return empty array when no results', async () => {
      mockVkmModel.aggregate.mockReturnValue([]);

      const result = await repository.findallsortedbytheme();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should call aggregate with complex pipeline', async () => {
      mockVkmModel.aggregate.mockReturnValue([]);

      await repository.findallsortedbytheme();

      expect(mockVkmModel.aggregate).toHaveBeenCalled();
      const aggregatePipeline = mockVkmModel.aggregate.mock.calls[0][0];
      expect(Array.isArray(aggregatePipeline)).toBe(true);
      expect(aggregatePipeline.length).toBeGreaterThan(0);
    });

    it('should include $addFields stage for parsing theme tags', async () => {
      mockVkmModel.aggregate.mockReturnValue([]);

      await repository.findallsortedbytheme();

      const aggregatePipeline = mockVkmModel.aggregate.mock.calls[0][0];
      expect(aggregatePipeline[0]).toHaveProperty('$addFields');
    });

    it('should include $unwind stage for expanding arrays', async () => {
      mockVkmModel.aggregate.mockReturnValue([]);

      await repository.findallsortedbytheme();

      const aggregatePipeline = mockVkmModel.aggregate.mock.calls[0][0];
      expect(aggregatePipeline[1]).toHaveProperty('$unwind');
    });

    it('should include $group stage for grouping by theme', async () => {
      mockVkmModel.aggregate.mockReturnValue([]);

      await repository.findallsortedbytheme();

      const aggregatePipeline = mockVkmModel.aggregate.mock.calls[0][0];
      expect(aggregatePipeline[2]).toHaveProperty('$group');
    });

    it('should include $project stage for formatting output', async () => {
      mockVkmModel.aggregate.mockReturnValue([]);

      await repository.findallsortedbytheme();

      const aggregatePipeline = mockVkmModel.aggregate.mock.calls[0][0];
      expect(aggregatePipeline[3]).toHaveProperty('$project');
    });

    it('should return array of grouped theme objects', async () => {
      const mockResult: any = [
        {
          theme: 'technology',
          count: 3,
          modules: [createMockVKM(), createMockVKM(), createMockVKM()],
        },
        {
          theme: 'innovation',
          count: 2,
          modules: [createMockVKM(), createMockVKM()],
        },
      ];
      mockVkmModel.aggregate.mockReturnValue(mockResult);

      const result = await repository.findallsortedbytheme();

      expect(result).toHaveLength(2);
      expect((result as any)[0].theme).toBe('technology');
      expect((result as any)[0].count).toBe(3);
      expect(Array.isArray((result as any)[0].modules)).toBe(true);
    });
  });

  describe('Repository method consistency', () => {
    it('should have all required repository methods', async () => {
      expect(typeof repository.findAll).toBe('function');
      expect(typeof repository.findById).toBe('function');
      expect(typeof repository.create).toBe('function');
      expect(typeof repository.update).toBe('function');
      expect(typeof repository.delete).toBe('function');
      expect(typeof repository.findbyName).toBe('function');
      expect(typeof repository.findbyTag).toBe('function');
      expect(typeof repository.findbyLevel).toBe('function');
      expect(typeof repository.findbyLocation).toBe('function');
      expect(typeof repository.findbystudyCredits).toBe('function');
      expect(typeof repository.findallsortedbytheme).toBe('function');
    });

    it('should have async methods', async () => {
      const method = repository.findAll();
      expect(method).toBeInstanceOf(Promise);
    });
  });
});
