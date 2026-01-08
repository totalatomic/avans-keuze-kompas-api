import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { userController } from "./user.controller";
import { userService } from "src/application/user";
import { UserRepositoryMongoDB } from "src/infrastructure/repositories/user";
import { AuthService } from "src/infrastructure/auth/auth.service";
import { Userschema } from "src/application/user/dto/user.schema.dto";
import { AuthModule } from '../../../infrastructure/auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: 'User', schema: Userschema }])],
  controllers: [userController],
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
export class UserModule { };