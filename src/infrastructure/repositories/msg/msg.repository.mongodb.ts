import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IMsgRepository } from "../../../domain/interfaces/";
import { MSG } from "../../../domain/entities";
import { MsgDocument } from '../../../application/msg/dto';

export class MsgRepositoryMongoDB implements IMsgRepository {
  private msgs: Map<string, MSG> = new Map();

  constructor(
        @InjectModel(MSG.name)
        private readonly msgModel: Model<MsgDocument>,
    ) { }

    async findById(id: string): Promise<MSG | null> {
        return null;
    }

    async findAll(): Promise<MSG[]> {
        return Array.from(this.msgs.values());
    }

    async create(msg: MSG): Promise<MSG> {
        this.msgs.set(msg.id, msg);
        return msg;
    }

    async update(id: string, item: MSG): Promise<MSG | null> {
        return null;
    }

    async delete(id: string): Promise<boolean> {
        return this.msgs.delete(id);
    }

    async findByReceiverId(receiverId: string): Promise<MSG[]> {
        const result: MSG[] = [];
        this.msgs.forEach((msg) => {
            if (msg.receiverId === receiverId) {
                result.push(msg);
            }
        });

        return result;
    }

    async findBySenderName(senderName: string): Promise<MSG[]> {
        const result: MSG[] = [];
        this.msgs.forEach((msg) => {
            if (msg.senderName === senderName) {
                result.push(msg);
            }
        });

        return result;
    }

    async findUnreadByReceiverId(receiverId: string, isRead: boolean): Promise<MSG[]> {
        const result: MSG[] = [];
        this.msgs.forEach((msg) => {
            if (msg.receiverId === receiverId && msg.isRead === isRead) {
                result.push(msg);
            }
        });

        return result;
    }





}