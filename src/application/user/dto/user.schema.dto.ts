import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/domain/entities";

export type UserSchemaDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class UserSchemaDto extends User {
  //override properties to add decorators
}
export const Userschema = SchemaFactory.createForClass(UserSchemaDto);