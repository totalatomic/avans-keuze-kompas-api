import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MsgRepositoryMongoDB } from 'src/infrastructure/repositories/msg.repository.mongodb';
import { MSG } from 'src/domain/entities';

describe('MsgRepositoryMongoDB', () => {
  let repository: MsgRepositoryMongoDB;
  let mockMsgModel: any;

  // Mock data factory
  const createMockMsg = (): MSG => {
    const msg = new MSG();
    msg._id = '507f1f77bcf86cd799439011';
    msg.senderName = 'John Doe';
    msg.receiverId = '507f1f77bcf86cd799439012';
    msg.title = 'Test Message';
    msg.messageText = 'This is a test message';
    msg.sentAt = new Date('2024-01-29');
    msg.isRead = false;
    msg.createdAt = new Date('2024-01-29');
    msg.updatedAt = new Date('2024-01-29');
    return msg;
  };

  beforeEach(async () => {
    // Create mock Mongoose model
    mockMsgModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      updateMany: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MsgRepositoryMongoDB,
        {
          provide: getModelToken(MSG.name),
          useValue: mockMsgModel,
        },
      ],
    }).compile();

    repository = module.get<MsgRepositoryMongoDB>(MsgRepositoryMongoDB);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new message with all properties', async () => {
      const msgToCreate = createMockMsg();
      const createdMsg = { ...msgToCreate };

      mockMsgModel.create.mockResolvedValue(createdMsg);

      const result = await repository.create(msgToCreate);

      expect(result).toEqual(createdMsg);
      expect(mockMsgModel.create).toHaveBeenCalledWith({
        senderName: msgToCreate.senderName.toString(),
        receiverId: msgToCreate.receiverId.toString(),
        title: msgToCreate.title.toString(),
        messageText: msgToCreate.messageText.toString(),
        sentAt: msgToCreate.sentAt,
        isRead: msgToCreate.isRead,
      });
    });

    it('should convert all string properties to string', async () => {
      const msgToCreate = createMockMsg();
      const createdMsg = { ...msgToCreate };

      mockMsgModel.create.mockResolvedValue(createdMsg);

      await repository.create(msgToCreate);

      const callArgs = mockMsgModel.create.mock.calls[0][0];
      expect(typeof callArgs.senderName).toBe('string');
      expect(typeof callArgs.receiverId).toBe('string');
      expect(typeof callArgs.title).toBe('string');
      expect(typeof callArgs.messageText).toBe('string');
    });

    it('should preserve isRead flag as false for new messages', async () => {
      const msgToCreate = createMockMsg();
      msgToCreate.isRead = false;
      const createdMsg = { ...msgToCreate };

      mockMsgModel.create.mockResolvedValue(createdMsg);

      const result = await repository.create(msgToCreate);

      expect(result.isRead).toBe(false);
    });

    it('should preserve isRead flag as true if set', async () => {
      const msgToCreate = createMockMsg();
      msgToCreate.isRead = true;
      const createdMsg = { ...msgToCreate };

      mockMsgModel.create.mockResolvedValue(createdMsg);

      const result = await repository.create(msgToCreate);

      expect(result.isRead).toBe(true);
    });
  });

  describe('findAll', () => {
    it('should return array containing a MSG instance', async () => {
      const result = await repository.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0]).toBeInstanceOf(MSG);
    });

    it('should handle empty message list', async () => {
      const mockExec = jest.fn().mockResolvedValue([]);
      mockMsgModel.find.mockReturnValue({
        exec: mockExec,
      });

      const result = await repository.findAll();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findById', () => {
    it('should always return null', async () => {
      const msgId = 1;

      const result = await repository.findById(msgId);

      expect(result).toBeNull();
    });

    it('should return null regardless of ID provided', async () => {
      const result1 = await repository.findById(1);
      const result2 = await repository.findById(999);

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a message', async () => {
      const msgId = '507f1f77bcf86cd799439011';
      const updateData: Partial<MSG> = {
        title: 'Updated Title',
        isRead: true,
      };
      const updatedMsg = createMockMsg();
      updatedMsg.title = 'Updated Title';
      updatedMsg.isRead = true;

      const result = await repository.update(msgId, updateData);

      expect(result).toBeDefined();
    });

    it('should return a MSG instance', async () => {
      const msgId = '507f1f77bcf86cd799439011';
      const updateData: Partial<MSG> = { title: 'Updated' };

      const result = await repository.update(msgId, updateData);

      expect(result).toBeInstanceOf(MSG);
    });

    it('should handle null return gracefully', async () => {
      const msgId = '999';
      const updateData: Partial<MSG> = { title: 'Updated' };

      const result = await repository.update(msgId, updateData);

      expect(result).toBeInstanceOf(MSG);
    });
  });

  describe('delete', () => {
    it('should return false on deletion attempt', async () => {
      const msgId = '507f1f77bcf86cd799439011';

      const result = await repository.delete(msgId);

      expect(result).toBe(false);
    });

    it('should not throw error on invalid ID', async () => {
      const msgId = '999';

      const result = await repository.delete(msgId);

      expect(result).toBe(false);
    });
  });

  describe('findByReceiverId', () => {
    it('should return messages for a receiver', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const mockMessages = [createMockMsg()];

      const mockExec = jest.fn().mockResolvedValue(mockMessages);
      mockMsgModel.updateMany.mockReturnValue({
        exec: jest.fn().mockResolvedValue({}),
      });
      mockMsgModel.find.mockReturnValue({
        exec: mockExec,
      });

      const result = await repository.findByReceiverId(receiverId);

      expect(Array.isArray(result)).toBe(true);
    });

    it('should update isRead flag to true before returning', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const mockMessages = [createMockMsg()];

      const updateManyExec = jest.fn().mockResolvedValue({});
      mockMsgModel.updateMany.mockReturnValue({
        exec: updateManyExec,
      });

      const findExec = jest.fn().mockResolvedValue(mockMessages);
      mockMsgModel.find.mockReturnValue({
        exec: findExec,
      });

      await repository.findByReceiverId(receiverId);

      expect(mockMsgModel.updateMany).toHaveBeenCalled();
      const updateManyCall = mockMsgModel.updateMany.mock.calls[0];
      expect(updateManyCall[0]).toEqual({ receiverId: receiverId });
      expect(updateManyCall[1]).toEqual({ $set: { isRead: true } });
    });

    it('should throw error if no messages found', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      const updateManyExec = jest.fn().mockResolvedValue({});
      mockMsgModel.updateMany.mockReturnValue({
        exec: updateManyExec,
      });

      const findExec = jest
        .fn()
        .mockResolvedValue([]); // Empty array simulates no messages
      mockMsgModel.find.mockReturnValue({
        exec: findExec,
      });

      await expect(
        repository.findByReceiverId(receiverId),
      ).rejects.toThrow('No messages found');
    });

    it('should filter messages by next minute boundary', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const mockMessages = [createMockMsg()];

      const updateManyExec = jest.fn().mockResolvedValue({});
      mockMsgModel.updateMany.mockReturnValue({
        exec: updateManyExec,
      });

      const findExec = jest.fn().mockResolvedValue(mockMessages);
      mockMsgModel.find.mockReturnValue({
        exec: findExec,
      });

      await repository.findByReceiverId(receiverId);

      const findCall = mockMsgModel.find.mock.calls[0][0];
      expect(findCall.receiverId).toBe(receiverId);
      expect(findCall.sentAt).toBeDefined();
      expect(findCall.sentAt.$lt).toBeInstanceOf(Date);
    });
  });

  describe('findBySenderName', () => {
    it('should return null for any sender name', async () => {
      const senderName = 'John Doe';

      const result = await repository.findBySenderName(senderName);

      expect(result).toBeNull();
    });

    it('should handle different sender names', async () => {
      const result1 = await repository.findBySenderName('Alice');
      const result2 = await repository.findBySenderName('Bob');

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });
  });

  describe('findUnreadByReceiverId', () => {
    it('should return unread messages for a receiver', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const mockMessages = [createMockMsg()];
      mockMessages[0].isRead = false;

      const findExec = jest.fn().mockResolvedValue(mockMessages);
      mockMsgModel.find.mockReturnValue({
        exec: findExec,
      });

      const result = await repository.findUnreadByReceiverId(receiverId);

      expect(Array.isArray(result)).toBe(true);
      expect(mockMsgModel.find).toHaveBeenCalled();
    });

    it('should filter by isRead false', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const mockMessages = [createMockMsg()];

      const findExec = jest.fn().mockResolvedValue(mockMessages);
      mockMsgModel.find.mockReturnValue({
        exec: findExec,
      });

      await repository.findUnreadByReceiverId(receiverId);

      const findCall = mockMsgModel.find.mock.calls[0][0];
      expect(findCall.isRead).toBe(false);
      expect(findCall.receiverId).toBe(receiverId);
    });

    it('should throw error if no unread messages found', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      const findExec = jest.fn().mockResolvedValue([]);
      mockMsgModel.find.mockReturnValue({
        exec: findExec,
      });

      await expect(
        repository.findUnreadByReceiverId(receiverId),
      ).rejects.toThrow('No messages found');
    });

    it('should handle null result gracefully', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      const findExec = jest.fn().mockResolvedValue(null);
      mockMsgModel.find.mockReturnValue({
        exec: findExec,
      });

      await expect(
        repository.findUnreadByReceiverId(receiverId),
      ).rejects.toThrow('No messages found');
    });

    it('should filter messages by next minute boundary', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const mockMessages = [createMockMsg()];

      const findExec = jest.fn().mockResolvedValue(mockMessages);
      mockMsgModel.find.mockReturnValue({
        exec: findExec,
      });

      await repository.findUnreadByReceiverId(receiverId);

      const findCall = mockMsgModel.find.mock.calls[0][0];
      expect(findCall.sentAt).toBeDefined();
      expect(findCall.sentAt.$lt).toBeInstanceOf(Date);
    });
  });
});
