import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { MSG } from "../../../domain/entities";

export type MsgDocument = HydratedDocument<MSG>;

@Schema({ timestamps: true })
export class MsgDto extends MSG {
  //override properties to add decorators
  @Prop({ required: true })
  description: string;
}

export const MsgSchema = SchemaFactory.createForClass(MsgDto);
