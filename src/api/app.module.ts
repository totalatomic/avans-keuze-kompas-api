import { Module } from '@nestjs/common';
import { MsgModule } from './controllers/msg/index';

@Module({  
    imports    : [MsgModule],
    controllers: [],
    providers  : [],
    exports    : [],
})
export class AppModule {}
