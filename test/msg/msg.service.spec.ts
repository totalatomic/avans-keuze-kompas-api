import { Test, TestingModule } from '@nestjs/testing';
import { MsgService } from 'src/application/service/msg.service';
import { MsgRepositoryMongoDB } from 'src/infrastructure/repositories/msg.repository.mongodb';
import { MSG } from 'src/domain/entities';

describe('MsgService', () => {
  let service: MsgService;
  let repository: MsgRepositoryMongoDB;

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

  const mockMsg = createMockMsg();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MsgService,
        {
          provide: 'MSG_REPOSITORY',
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByReceiverId: jest.fn(),
            findBySenderName: jest.fn(),
            findUnreadByReceiverId: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MsgService>(MsgService);
    repository = module.get('MSG_REPOSITORY');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of all messages', async () => {
      const mockMessages = [mockMsg, createMockMsg()];
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockMessages as any);

      const result = await service.findAll();

      expect(result).toEqual(mockMessages);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no messages exist', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a message by ID', async () => {
      const msgId = 1;
      jest.spyOn(repository, 'findById').mockResolvedValue(mockMsg as any);

      const result = await service.findById(msgId);

      expect(result).toEqual(mockMsg);
      expect(repository.findById).toHaveBeenCalledWith(msgId);
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null if message not found', async () => {
      const msgId = 999;
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      const result = await service.findById(msgId);

      expect(result).toBeNull();
      expect(repository.findById).toHaveBeenCalledWith(msgId);
    });
  });

  describe('create', () => {
    it('should create and return a new message', async () => {
      const newMsg = createMockMsg();
      jest.spyOn(repository, 'create').mockResolvedValue(newMsg as any);

      const result = await service.create(newMsg);

      expect(result).toEqual(newMsg);
      expect(repository.create).toHaveBeenCalledWith(newMsg);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it('should persist all message properties', async () => {
      const newMsg = createMockMsg();
      newMsg.senderName = 'Jane Smith';
      newMsg.title = 'Important Update';
      newMsg.messageText = 'Please review this message';

      jest.spyOn(repository, 'create').mockResolvedValue(newMsg as any);

      const result = await service.create(newMsg);

      expect(result.senderName).toBe('Jane Smith');
      expect(result.title).toBe('Important Update');
      expect(result.messageText).toBe('Please review this message');
    });
  });

  describe('update', () => {
    it('should update and return the modified message', async () => {
      const msgId = '507f1f77bcf86cd799439011';
      const updatedMsg = createMockMsg();
      updatedMsg.title = 'Updated Title';
      updatedMsg.isRead = true;

      jest.spyOn(repository, 'update').mockResolvedValue(updatedMsg as any);

      const result = await service.update(msgId, updatedMsg);

      expect(result).toEqual(updatedMsg);
      expect(repository.update).toHaveBeenCalledWith(msgId, updatedMsg);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should return null if message to update not found', async () => {
      const msgId = '999';
      const updateData = createMockMsg();

      jest.spyOn(repository, 'update').mockResolvedValue(null);

      const result = await service.update(msgId, updateData);

      expect(result).toBeNull();
      expect(repository.update).toHaveBeenCalledWith(msgId, updateData);
    });

    it('should update read status', async () => {
      const msgId = '507f1f77bcf86cd799439011';
      const updatedMsg = createMockMsg();
      updatedMsg.isRead = true;

      jest.spyOn(repository, 'update').mockResolvedValue(updatedMsg as any);

      const result = await service.update(msgId, updatedMsg);

      expect(result?.isRead).toBe(true);
    });
  });

  describe('delete', () => {
    it('should delete a message and return true', async () => {
      const msgId = '507f1f77bcf86cd799439011';
      jest.spyOn(repository, 'delete').mockResolvedValue(true);

      const result = await service.delete(msgId);

      expect(result).toBe(true);
      expect(repository.delete).toHaveBeenCalledWith(msgId);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });

    it('should return false if message to delete not found', async () => {
      const msgId = '999';
      jest.spyOn(repository, 'delete').mockResolvedValue(false);

      const result = await service.delete(msgId);

      expect(result).toBe(false);
      expect(repository.delete).toHaveBeenCalledWith(msgId);
    });
  });

  describe('findByReceiverId', () => {
    it('should return all messages for a receiver', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const mockMessages = [mockMsg, createMockMsg()];

      jest
        .spyOn(repository, 'findByReceiverId')
        .mockResolvedValue(mockMessages as any);

      const result = await service.findByReceiverId(receiverId);

      expect(result).toEqual(mockMessages);
      expect(repository.findByReceiverId).toHaveBeenCalledWith(receiverId);
      expect(repository.findByReceiverId).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if receiver has no messages', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      jest.spyOn(repository, 'findByReceiverId').mockResolvedValue([]);

      const result = await service.findByReceiverId(receiverId);

      expect(result).toEqual([]);
    });
  });

  describe('findBySenderName', () => {
    it('should return all messages from a sender', async () => {
      const senderName = 'John Doe';
      const mockMessages = [mockMsg];

      jest
        .spyOn(repository, 'findBySenderName')
        .mockResolvedValue(mockMessages as any);

      const result = await service.findBySenderName(senderName);

      expect(result).toEqual(mockMessages);
      expect(repository.findBySenderName).toHaveBeenCalledWith(senderName);
      expect(repository.findBySenderName).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if sender has no messages', async () => {
      const senderName = 'Unknown Sender';

      jest.spyOn(repository, 'findBySenderName').mockResolvedValue([]);

      const result = await service.findBySenderName(senderName);

      expect(result).toEqual([]);
    });

    it('should return null if sender not found', async () => {
      const senderName = 'NonExistent';

      jest.spyOn(repository, 'findBySenderName').mockResolvedValue(null);

      const result = await service.findBySenderName(senderName);

      expect(result).toBeNull();
    });

    it('should be case-sensitive for sender names', async () => {
      const senderName = 'john doe';

      jest.spyOn(repository, 'findBySenderName').mockResolvedValue([]);

      await service.findBySenderName(senderName);

      expect(repository.findBySenderName).toHaveBeenCalledWith(senderName);
    });
  });

  describe('findUnreadByReceiverId', () => {
    it('should return all unread messages for a receiver', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const unreadMsg = createMockMsg();
      unreadMsg.isRead = false;
      const mockUnreadMessages = [unreadMsg];

      jest
        .spyOn(repository, 'findUnreadByReceiverId')
        .mockResolvedValue(mockUnreadMessages as any);

      const result = await service.findUnreadByReceiverId(receiverId);

      expect(result).toEqual(mockUnreadMessages);
      expect(repository.findUnreadByReceiverId).toHaveBeenCalledWith(
        receiverId,
      );
      expect(repository.findUnreadByReceiverId).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if receiver has no unread messages', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      jest
        .spyOn(repository, 'findUnreadByReceiverId')
        .mockResolvedValue([]);

      const result = await service.findUnreadByReceiverId(receiverId);

      expect(result).toEqual([]);
    });

    it('should return null if receiver not found', async () => {
      const receiverId = '999';

      jest.spyOn(repository, 'findUnreadByReceiverId').mockResolvedValue(null);

      const result = await service.findUnreadByReceiverId(receiverId);

      expect(result).toBeNull();
    });

    it('should only return unread messages', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const unreadMsg1 = createMockMsg();
      unreadMsg1.isRead = false;
      const unreadMsg2 = createMockMsg();
      unreadMsg2.isRead = false;

      jest
        .spyOn(repository, 'findUnreadByReceiverId')
        .mockResolvedValue([unreadMsg1, unreadMsg2] as any);

      const result = await service.findUnreadByReceiverId(receiverId);

      expect(result).toHaveLength(2);
      expect(result?.[0].isRead).toBe(false);
      expect(result?.[1].isRead).toBe(false);
    });
  });
});
