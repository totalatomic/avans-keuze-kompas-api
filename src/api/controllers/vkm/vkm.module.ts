import { Module } from "@nestjs/common";
import { VkmController } from "./vkm.controller";
import { VkmService } from "../../../application/vkm/vkm.service";
import { VkmRepositoryMongoDB } from "../../../infrastructure/repositories/vkm/vkm.repository.mongodb";
@Module({
  controllers: [VkmController],
  providers: [VkmService, VkmRepositoryMongoDB],
})
export class VkmModule { }