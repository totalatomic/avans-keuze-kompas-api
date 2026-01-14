import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";

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
  async create(msg: MSG): Promise<MSG> {

    const newMsg = await this.MsgModel.create({
        senderName: msg.senderName.toString(),
        receiverId: msg.receiverId.toString(),
        title: msg.title.toString(),
        messageText: msg.messageText.toString(),
        sentAt: msg.sentAt,
        isRead: msg.isRead
      });

    return newMsg;
  }
  async findAll(): Promise<MSG[]> {
    return [new MSG()];
  }
  async findByReceiverId(receiverId: string): Promise<MSG[]> {
    
    const nextMinute = new Date();
    nextMinute.setSeconds(0, 0);
    nextMinute.setMinutes(nextMinute.getMinutes() + 1);

    await this.MsgModel.updateMany(
        {receiverId: receiverId},
        {$set: { isRead: true }
      }).exec();

    const returntype = await this.MsgModel.find({
       receiverId: receiverId, 
       sentAt: {
          $lt: nextMinute
       }
    }).exec();

    if (!returntype || returntype.length === 0) {
      throw new Error ("No messages found");
      return [];
    }
    return returntype
  }
  async findBySenderName(senderName: string): Promise<MSG[] | null> {
    return null;
  }
  async findUnreadByReceiverId(receiverId: string): Promise<MSG[] | null> {

    const nextMinute = new Date();
    nextMinute.setSeconds(0, 0);
    nextMinute.setMinutes(nextMinute.getMinutes() + 1);

    const returntype = await this.MsgModel.find({
       receiverId: receiverId, 
       sentAt: {
          $lt: nextMinute
       },
       isRead: false
    }).exec();  

    if (!returntype || returntype.length === 0) {
      throw new Error ("No messages found");
    }

    return returntype;  
    
  }

}