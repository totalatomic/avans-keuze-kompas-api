import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import { IMsgRepository } from "../../../domain/interfaces/";
import { MSG } from "../../../domain/entities";

export type MsgDocument = MSG & Document;

export class MsgRepositoryMongoDB implements IMsgRepository {
  private msgs: Map<string, MSG> = new Map();

  constructor(
        @InjectModel(MSG.name)
        private readonly msgModel: Model<MsgDocument>,
    ) { }



    async findById(id: string): Promise<MSG | null>;
    async findById(id: number): Promise<MSG | null>;
    async findById(id: string | number): Promise<MSG | null> {
        return this.msgs.get(String(id)) || null;
    }

    async findAll(): Promise<MSG[]> {
        return Array.from(this.msgs.values());
    }

    async create(msg: MSG): Promise<MSG> {
        this.msgs.set(msg._id, msg);
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
                msg.isRead = true;
                result.push(msg);
            }
            else {
                throw new Error('No messages found for this receiver.');
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
            else {
                throw new Error('No messages found from this sender.');
            }
        });

        return result;
    }

    async findUnreadByReceiverId(receiverId: string): Promise<MSG[]> {
        const result: MSG[] = [];
        this.msgs.forEach((msg) => {
            if (msg.receiverId === receiverId && msg.isRead === false) {
                result.push(msg);
            }
            else {
                throw new Error('No unread messages found for this receiver.');
            }
        });

        return result;
    }





}