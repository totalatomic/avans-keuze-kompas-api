import { Module } from "@nestjs/common";
import { VkmController } from "./vkm.controller";
import { VkmService } from "../../../application/service/vkm.service";
import { VkmRepositoryMongoDB } from "../../../infrastructure/repositories/vkm.repository.mongodb";
import { VkmSchema } from "src/application/dto/vkm";
import { VKM } from "src/domain/entities";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: VKM.name, schema: VkmSchema }])
  ],
  controllers: [VkmController],
  providers: [
    VkmService,
    VkmRepositoryMongoDB,
    {
      provide: 'IvkmRepository',
      useClass: VkmRepositoryMongoDB
    }
  ],
  exports: ['IvkmRepository', VkmService]
})
export class VkmModule { }