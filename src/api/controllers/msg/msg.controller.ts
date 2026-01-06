import {Controller, Get, Param, Body, Post, Delete, Patch} from '@nestjs/common';
import { MsgService } from '../../../application/msg';

@Controller('msg')
export class MsgController {

    
    @Get()
    async getAllMsgs() {
        return [{'This action returns all msgs'}];
    }

    @Get(':id')
    async getMsgByReceiverId(@Param('id') id: string) {
        
    }

}