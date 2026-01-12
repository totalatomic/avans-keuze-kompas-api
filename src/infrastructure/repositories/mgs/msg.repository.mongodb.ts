import { InjectModel } from "@nestjs/mongoose";
import { Model, Document, Mongoose} from "mongoose";
import { ObjectId } from "mongodb";
import { IMsgRepository } from "../../../domain/interfaces/";
import { MSG } from "../../../domain/entities";
import { MsgSchemaDocument } from "src/application/msg";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MsgRepositoryMongoDB implements IMsgRepository {
  constructor(
    @InjectModel(MSG.name)
    private readonly MsgModel: Model<MsgSchemaDocument>
  ) { }
  async update(id: string, item: Partial<MSG>): Promise<MSG | null> {
    return new MSG()
  }
  async delete(id: string): Promise<boolean> {
    return false;
  }
  async findById(id: number): Promise<MSG | null> {
    return null;
  }
  async create(item: MSG): Promise<MSG> {
    this.MsgModel.insertOne(
      {
        senderName: item.senderName,
        receiverId: item.receiverId,
        title: item.title,
        messageText: item.messageText,
        sentAt: item.sentAt,
        isRead: item.isRead
      }
    );
    return item;
  }
  async findAll(): Promise<MSG[]> {
    return [new MSG()];
  }
  async findByReceiverId(receiverId: string): Promise<MSG[]> {
    
    const nextMinute = new Date();
    nextMinute.setSeconds(0, 0);
    nextMinute.setMinutes(nextMinute.getMinutes() + 1);

    const returntype = await this.MsgModel.find({
       _id: receiverId.toString(), 
       date: {
          $lt: nextMinute
       }
    }).exec();

    await this.MsgModel.updateMany({_id: receiverId},{$set: {isRead: true}}).exec()
    return returntype
  }
  async findBySenderName(senderName: string): Promise<MSG[] | null> {
    return null;
  }
  async findUnreadByReceiverId(receiverId: string): Promise<MSG[] | null> {
    return null;
  }

}