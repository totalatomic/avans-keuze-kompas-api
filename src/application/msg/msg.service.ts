import { Injectable } from "@nestjs/common";
import { MsgRepositoryMongoDB } from "src/infrastructure/repositories/msg";
import { MSG } from "src/domain/entities";
import { IMsgRepository } from "src/domain/interfaces";

@Injectable()
export class MsgService implements IMsgRepository {
    constructor(private readonly msgRepository: MsgRepositoryMongoDB) { }
    async findAll(): Promise<MSG[]> {
        return this.msgRepository.findAll();
    }
    async findById(id: string): Promise<MSG | null> {
        return this.msgRepository.findById(id);
    }
    async update(id: string, item: MSG): Promise<MSG | null> {
        return this.msgRepository.update(id, item);
    }
    async delete(id: string): Promise<boolean> {
        return this.msgRepository.delete(id);
    }
    async findByReceiverId(receiverId: string): Promise<MSG[]> {
        return this.msgRepository.findByReceiverId(receiverId);
    }
    async findBySenderName(senderName: string): Promise<MSG[]> {
        return this.msgRepository.findBySenderName(senderName);
    }
    async findUnreadByReceiverId(receiverId: string, isRead: boolean): Promise<MSG[]> {
        return this.msgRepository.findUnreadByReceiverId(receiverId, isRead);
    }
    async create(msg: MSG): Promise<MSG> {
        return this.msgRepository.create(msg);
    }
}