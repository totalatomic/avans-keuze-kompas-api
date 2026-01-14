import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Types,  } from "mongoose";
import { MSG } from "src/domain/entities";

export type MsgSchemaDocument = HydratedDocument<MSG>;

@Schema({ timestamps: true, _id: true })
export class MSGSchemaDto {

  @Prop({ required: true })
  senderName: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  messageText: string;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ default: false })
  isRead: boolean;
}

export const MSGSchema = SchemaFactory.createForClass(MSGSchemaDto);
MSGSchema.index({ id: 1 }, { sparse: true });