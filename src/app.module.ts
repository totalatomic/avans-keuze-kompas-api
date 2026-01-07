import { Module } from "@nestjs/common";
import { VkmService } from "src/application/vkm";
import { VkmController } from "./api/controllers/vkm/vkm.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VkmSchema } from "src/application/vkm/dto";
import { VkmModule } from "./api/controllers/vkm/vkm.module";
import { ConfigModule } from "@nestjs/config";
import { envConfiguration } from './infrastructure/env';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envConfiguration]
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: envConfiguration().database.url
      })
    }), VkmModule
  ],
  controllers: [VkmController],
  providers: [
    VkmService
  ]
})
export class AppModule { }