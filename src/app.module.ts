import { Module } from "@nestjs/common";
import { VkmService } from "./application/service/vkm.service";
import { VkmController } from "./api/controllers/vkm/vkm.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VkmSchema } from "src/application/dto/vkm";
import { VkmModule } from "./api/controllers/vkm/vkm.module";
import { ConfigModule } from "@nestjs/config";
import { envConfiguration } from './infrastructure/env';
import { userController, UserModule } from "./api/controllers/user";
import { RecommendationModule } from "./api/controllers/ai/recommendation.module";
import { userService } from "./application/service/user.service";

import { MsgController } from "./api/controllers/msg/msg.controller";
import { MsgService } from "./application/service/msg.service";
import { MsgModule } from "./api/controllers/msg/msg.module";
import { FavoriteModule } from "./api/controllers/favorite/favorites.module";

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
    }),
    VkmModule,
    UserModule,
    RecommendationModule,
    MsgModule,
    FavoriteModule,
  ],
  controllers: [VkmController, userController, MsgController],
  providers: [
    VkmService,
    userService,
    MsgService
  ]
})
export class AppModule { }