import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { VKM } from "../../../domain/entities";

export type VkmDocument = HydratedDocument<VKM>;

@Schema({ timestamps: true })
export class VkmDto extends VKM {
  //override properties to add decorators
  @Prop({ required: true })
  name: string;
}
export const VkmSchema = SchemaFactory.createForClass(VkmDto);

