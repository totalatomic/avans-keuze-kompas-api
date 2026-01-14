import { Module } from "@nestjs/common";
import { VkmController } from "./vkm.controller";
import { VkmService } from "../../../application/service/vkm.service";
import { VkmRepositoryMongoDB_en } from "../../../infrastructure/repositories/vkm.repository.mongodb_en";
import { VkmRepositoryMongoDB } from "../../../infrastructure/repositories/vkm.repository.mongodb";
import { VkmSchema } from "src/application/dto/vkm";
import { VKM } from "src/domain/entities";
import { MongooseModule } from "@nestjs/mongoose";
import { mongo, Mongoose } from "mongoose";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: VKM.name, schema: VkmSchema }]),
    MongooseModule.forFeature([{ name: 'VKM_ens', schema: VkmSchema }])
  ],
  controllers: [VkmController],
  providers: [
    VkmService,
    VkmRepositoryMongoDB,
    {
      provide: 'IvkmRepository',
      useClass: VkmRepositoryMongoDB
    },
    VkmRepositoryMongoDB_en,
    {
      provide: 'IvkmRepository_en',
      useClass: VkmRepositoryMongoDB_en
    }
  ],
  exports: ['IvkmRepository', VkmService, 'IvkmRepository_en']
})
export class VkmModule { }