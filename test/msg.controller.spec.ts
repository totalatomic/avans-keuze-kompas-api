import { Test, TestingModule } from '@nestjs/testing';
import { MsgController } from '../src/api/controllers/msg/msg.controller';
import { MsgService } from '../src/application/service/msg.service';
import { CreateMsgDto } from '../src/application/dto/msg';
import { MSG } from '../src/domain/entities';

describe('MsgController', () => {
  let controller: MsgController;
  let service: MsgService;

  // Mock data
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

  const mockCreateMsgDto: CreateMsgDto = {
    senderName: 'John Doe',
    title: 'Test Message',
    messageText: 'This is a test message',
    sentAt: new Date('2024-01-29'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsgController],
      providers: [
        {
          provide: MsgService,
          useValue: {
            findByReceiverId: jest.fn(),
            findUnreadByReceiverId: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MsgController>(MsgController);
    service = module.get<MsgService>(MsgService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMsgByReceiverId', () => {
    it('should return an array of messages for a given receiver ID', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const mockMessages = [mockMsg];

      jest.spyOn(service, 'findByReceiverId').mockResolvedValue(mockMessages);

      const result = await controller.getMsgByReceiverId(receiverId);

      expect(result).toEqual(mockMessages);
      expect(service.findByReceiverId).toHaveBeenCalledWith(receiverId);
      expect(service.findByReceiverId).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if no messages found', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      jest.spyOn(service, 'findByReceiverId').mockResolvedValue([]);

      const result = await controller.getMsgByReceiverId(receiverId);

      expect(result).toEqual([]);
      expect(service.findByReceiverId).toHaveBeenCalledWith(receiverId);
    });

    it('should return null if receiver has no messages', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      jest.spyOn(service, 'findByReceiverId').mockResolvedValue(null);

      const result = await controller.getMsgByReceiverId(receiverId);

      expect(result).toBeNull();
    });
  });

  describe('getUnreadMsgsByReceiverId', () => {
    it('should return unread messages for a given receiver ID', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const unreadMsg = createMockMsg();
      unreadMsg.isRead = false;
      const mockUnreadMessages = [unreadMsg];

      jest
        .spyOn(service, 'findUnreadByReceiverId')
        .mockResolvedValue(mockUnreadMessages as any);

      const result = await controller.getUnreadMsgsByReceiverId(receiverId);

      expect(result).toEqual(mockUnreadMessages);
      expect(service.findUnreadByReceiverId).toHaveBeenCalledWith(receiverId);
      expect(service.findUnreadByReceiverId).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if no unread messages found', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      jest
        .spyOn(service, 'findUnreadByReceiverId')
        .mockResolvedValue([]);

      const result = await controller.getUnreadMsgsByReceiverId(receiverId);

      expect(result).toEqual([]);
    });

    it('should return null if receiver has no unread messages', async () => {
      const receiverId = '507f1f77bcf86cd799439012';

      jest
        .spyOn(service, 'findUnreadByReceiverId')
        .mockResolvedValue(null);

      const result = await controller.getUnreadMsgsByReceiverId(receiverId);

      expect(result).toBeNull();
    });
  });

  describe('sendMsgToReceiver', () => {
    it('should create and return a new message', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const expectedMsg = createMockMsg();
      expectedMsg.receiverId = receiverId;
      expectedMsg.isRead = false;

      jest.spyOn(service, 'create').mockResolvedValue(expectedMsg as any);

      const result = await controller.sendMsgToReceiver(
        receiverId,
        mockCreateMsgDto,
      );

      expect(result).toEqual(expectedMsg);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should set isRead to false for new messages', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const expectedMsg = createMockMsg();
      expectedMsg.receiverId = receiverId;
      expectedMsg.isRead = false;

      jest.spyOn(service, 'create').mockResolvedValue(expectedMsg as any);

      await controller.sendMsgToReceiver(receiverId, mockCreateMsgDto);

      const createdMsg = (service.create as jest.Mock).mock.calls[0][0];
      expect(createdMsg.isRead).toBe(false);
      expect(createdMsg.senderName).toBe(mockCreateMsgDto.senderName);
      expect(createdMsg.title).toBe(mockCreateMsgDto.title);
      expect(createdMsg.messageText).toBe(mockCreateMsgDto.messageText);
      expect(createdMsg.receiverId).toBe(receiverId);
    });

    it('should handle messages with special characters', async () => {
      const receiverId = '507f1f77bcf86cd799439012';
      const dtoWithSpecialChars: CreateMsgDto = {
        senderName: 'John "Johnny" Doe',
        title: "Test & Special <Characters>",
        messageText: "Message with émojis 🎉 and spëcial chars",
        sentAt: new Date(),
      };
      const expectedMsg = createMockMsg();
      expectedMsg.senderName = dtoWithSpecialChars.senderName;
      expectedMsg.title = dtoWithSpecialChars.title;
      expectedMsg.messageText = dtoWithSpecialChars.messageText;
      expectedMsg.sentAt = dtoWithSpecialChars.sentAt;
      expectedMsg.receiverId = receiverId;

      jest.spyOn(service, 'create').mockResolvedValue(expectedMsg as any);

      const result = await controller.sendMsgToReceiver(
        receiverId,
        dtoWithSpecialChars,
      );

      expect(result).toEqual(expectedMsg);
    });
  });
});
