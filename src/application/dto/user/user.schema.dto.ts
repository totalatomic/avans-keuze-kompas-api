import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/domain/entities";
import { ChosenModule } from "../vkm/chosen.vkm";

@Schema({ timestamps: true })
export class UserSchemaDto {
  // override properties to add decorators

  @Prop({ type: Types.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [Number], default: [] })
  ai_recommended_vkms: number[];

  @Prop()
  dark_mode: string;

  @Prop({ type: [ChosenModule], default: [] })
  chosen_vkms: ChosenModule[];

  @Prop({ type: [Number], default: [] })
  favorite_vkms: number[];

  @Prop()
  first_name: string;

  @Prop({ default: false })
  isStudent: boolean;

  @Prop()
  language: string;

  @Prop()
  last_name: string;

  @Prop({ default: true })
  notifications: boolean;

  @Prop()
  prefix: string;

  @Prop({ default: 14 })
  text_size: number;

  @Prop()
  student_number: string;

  @Prop()
  course: string;
  @Prop()
  slber: string;
}
export type UserSchemaDocument = HydratedDocument<UserSchemaDto>;

export const Userschema = SchemaFactory.createForClass(UserSchemaDto);
