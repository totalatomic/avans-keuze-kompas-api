import { Module } from "@nestjs/common";
import { VkmService } from "src/application/vkm";
import { VkmController } from "./api/controllers/vkm/vkm.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VkmSchema } from "src/application/vkm/dto";
import { VkmModule } from "./api/controllers/vkm/vkm.module";
import { ConfigModule } from "@nestjs/config";
import { envConfiguration } from './infrastructure/env';
import { userController, UserModule } from "./api/controllers/user";
import { userService } from "./application/user";
import { RecommendationModule } from "./api/controllers/ai/recommendation.module";
import { RecommendationsService } from "./application/ai/recommendation.service";

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
    }), VkmModule,
    UserModule,
    RecommendationModule
  ],
  controllers: [VkmController, userController],
  providers: [
    VkmService,
    userService  
  ],
})
export class AppModule { }