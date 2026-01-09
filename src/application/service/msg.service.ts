import { Inject, Injectable } from "@nestjs/common";
import { MsgRepositoryMongoDB } from "src/infrastructure/repositories/msg.repository.mongodb";
import { MSG } from "src/domain/entities";

@Injectable()
export class MsgService {
  constructor(
    @Inject('MSG_REPOSITORY')
    private readonly msgRepository: MsgRepositoryMongoDB,
  ) { }

  async findAll(): Promise<MSG[]> {
    return this.msgRepository.findAll();
  }
  async findById(id: number): Promise<MSG | null> {
    return this.msgRepository.findById(id);
  }
  async update(id: string, item: MSG): Promise<MSG | null> {
    return this.msgRepository.update(id, item);
  }
  async delete(id: string): Promise<boolean> {
    return this.msgRepository.delete(id);
  }
  async findByReceiverId(receiverId: string): Promise<MSG[] | null> {
    return null;
  }
  async findBySenderName(senderName: string): Promise<MSG[] | null> {
    return this.msgRepository.findBySenderName(senderName);
  }
  async findUnreadByReceiverId(receiverId: string): Promise<MSG[] | null> {
    return this.msgRepository.findUnreadByReceiverId(receiverId)
  }
  async create(msg: MSG): Promise<MSG> {
    return this.msgRepository.create(msg);
  }
}