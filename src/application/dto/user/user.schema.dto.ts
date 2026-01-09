import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/domain/entities";

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
  ai_reccomended_vkms: number[];

  @Prop({ default: false })
  dark_mode: boolean;

  @Prop({ type: [Number], default: [] })
  enrolled_vkms: number[];

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
}
export type UserSchemaDocument = HydratedDocument<UserSchemaDto>;

export const Userschema = SchemaFactory.createForClass(UserSchemaDto);
