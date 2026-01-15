import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import { IMsgRepository } from "../../domain/interfaces";
import { MSG } from "../../domain/entities";
import { MsgSchemaDocument } from "src/application/dto/msg";
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
    return new MSG();
  }
  async findAll(): Promise<MSG[]> {
    return [new MSG()];
  }
  async findByReceiverId(receiverId: string): Promise<MSG[]> {
    return this.MsgModel.find({ receiverId }).exec();
  }
  async findBySenderName(senderName: string): Promise<MSG[] | null> {
    return null;
  }
  async findUnreadByReceiverId(receiverId: string): Promise<MSG[] | null> {
    return null;
  }

}