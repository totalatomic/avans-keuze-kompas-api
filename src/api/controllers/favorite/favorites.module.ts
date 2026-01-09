import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FavoriteController } from "./favorite.controller";
import { userService } from "src/application/service/user.service";
import { UserRepositoryMongoDB } from "src/infrastructure/repositories/user.repository.mongodb";
import { AuthService } from "src/infrastructure/auth/auth.service";
import { AuthModule } from '../../../infrastructure/auth/auth.module';
import { Userschema } from "src/application/dto/user/user.schema.dto";
import { UserModule } from "../user";
import { VkmModule } from "../vkm/vkm.module";

@Module({
  imports: [AuthModule, UserModule, VkmModule, MongooseModule.forFeature([{ name: 'User', schema: Userschema }])],
  controllers: [FavoriteController],
  providers: [
    userService,
    UserRepositoryMongoDB,
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryMongoDB
    },
    {
      provide: 'IAuthInterface',
      useExisting: AuthService
    }
  ],
  exports: ['IUserRepository', userService, 'IAuthInterface']
})
export class FavoriteModule { };