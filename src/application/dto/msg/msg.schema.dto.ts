import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MSG } from "src/domain/entities";

export type MsgSchemaDocument = HydratedDocument<MSG>;

Schema({ timestamps: true })
export class MSGSchemaDto extends MSG {
  //override properties to add decorators
}
export const MSGSchema = SchemaFactory.createForClass(MSGSchemaDto);