
import {Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards} from '@nestjs/common';
import {MsgService} from '../../../application/msg/services/index';
import {CreateMsgDto, GetMsgDto, SendMsgDto } from '../../../application/msg/dto/index';

//Controller for system messages
@Controller('msg')
export class MsgController{

    constructor(
        private readonly msgService: MsgService

    ) {}

    //get all messages for a user
    @Get(':User_id')
    async getMsgByUserId(@Param('User_id') user_id: string)
    {
        const msg = await this.msgService.getMsgByUserId(user_id);
        return msg;
    }
    
    @Get('/get_unread/:User_id')
    async getUnreadMsgByUserId(@Param('User_id') user_id: string)
    {
        const unreadMsg = await this.msgService.getUnreadMsgByUserId(user_id);
        return unreadMsg;
        
    }

    
    @Post('/send_to/:User_id')
    async postMsg(@Param('User_id') user_id: string, @Body() createMsgDto: CreateMsgDto, sendMsgDto: SendMsgDto)
    {
        await this.msgService.sendMsg(sendMsgDto);
        await this.msgService.createMsg(createMsgDto);
        
    }

    
}
