import { Module } from "@nestjs/common";
import { VkmService } from "src/application/vkm";
import { VkmController } from "./api/controllers/vkm/vkm.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VkmSchema } from "src/application/vkm/dto";
import { VkmModule } from "./api/controllers/vkm/vkm.module";
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI
      })
    }), VkmModule
  ],
  controllers: [VkmController],
  providers: [
    VkmService
  ]
})
export class AppModule { }