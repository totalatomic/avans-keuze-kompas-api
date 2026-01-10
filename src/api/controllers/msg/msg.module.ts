import { Module } from "@nestjs/common";
import { MsgController } from "./msg.controller";
import { MsgService } from "../../../application/service/msg.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MSGSchema } from "src/application/dto/msg/msg.schema.dto";
import { MsgRepositoryMongoDB } from "src/infrastructure/repositories/msg.repository.mongodb";
import { MSG } from "src/domain/entities";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MSG.name, schema: MSGSchema },
    ]),
  ],
  controllers: [MsgController],
  providers: [
    {
      provide: 'MSG_REPOSITORY',
      useClass: MsgRepositoryMongoDB,
    },
    MsgService,
  ],
  exports: ['MSG_REPOSITORY', MsgService]
})
export class MsgModule { }