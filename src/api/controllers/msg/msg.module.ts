import { Module } from "@nestjs/common";
import { MsgController } from "./msg.controller";
import { MsgService } from "src/application/msg/msg.service";
@Module({
  controllers: [MsgController],
  providers: [MsgService],
})
export class MsgModule { }