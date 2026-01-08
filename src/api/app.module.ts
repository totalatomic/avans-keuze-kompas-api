import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MsgService } from "src/application/msg/msg.service";
import { MsgRepositoryMongoDB } from "src/infrastructure/repositories/msg";
import { MsgController } from "src/api/controllers/msg/msg.controller";
import { MSG } from "src/domain/entities";
import { MsgSchema } from "src/infrastructure/schemas/msg.schema";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://resu_bd_netnanjinnavcul:1j6h5xEZ3oAWpO2i@schooldb.jcsaugr.mongodb.net/avans_kk_DB?retryWrites=true&w=majority', {
      retryAttempts: 1,
      retryDelay: 1000,
    }),
    MongooseModule.forFeature([{ name: MSG.name, schema: MsgSchema }])
  ],
  controllers: [MsgController],
  providers: [ MsgRepositoryMongoDB, MsgService] 
})
export class AppModule { }