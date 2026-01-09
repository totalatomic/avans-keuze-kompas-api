import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { userController } from "./user.controller";
import { userService } from "../../../application/service/user.service";
import { UserRepositoryMongoDB } from "src/infrastructure/repositories/user.repository.mongodb";
import { AuthService } from "src/infrastructure/auth/auth.service";
import { Userschema } from "src/application/dto/user/user.schema.dto";
import { AuthModule } from '../../../infrastructure/auth/auth.module';
import { VkmModule } from "../vkm/vkm.module";

@Module({
  imports: [
    AuthModule,
    VkmModule, 
    MongooseModule.forFeature([{ name: 'User', schema: Userschema }])
  ],
  controllers: [userController],
  providers: [
    userService,
    UserRepositoryMongoDB,
    { provide: 'IUserRepository', useClass: UserRepositoryMongoDB },
    { provide: 'IAuthInterface', useExisting: AuthService }
  ],
  exports: ['IUserRepository', userService, 'IAuthInterface']
})
export class UserModule { }