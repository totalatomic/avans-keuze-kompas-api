import { Controller, Get, Param, Body, Post, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { MsgService } from '../../../application/service/msg.service';
import { CreateMsgDto } from '../../../application/dto/msg';
import { UUID } from 'mongodb';

import { MSG } from 'src/domain/entities';

@Controller('msg')
@ApiTags('MSG')
export class MsgController {
  constructor(private readonly msgService: MsgService) { }



  @Get(':id')
  @ApiOperation({ summary: 'Get MSG by Receiver ID' })
  @ApiParam({ name: 'id', required: true, description: 'Receiver ID of the MSG' })
  async getMsgByReceiverId(@Param('id') id: string) {

    return this.msgService.findByReceiverId(id);
  }

  @Get('get_unread/:receiverId')
  @ApiOperation({ summary: 'Get Unread MSGs by Receiver ID' })
  @ApiParam({ name: 'receiverId', required: true, description: 'Receiver ID to get unread MSGs for' })
  async getUnreadMsgsByReceiverId(@Param('receiverId') receiverId: string) {

    return this.msgService.findUnreadByReceiverId(receiverId);
  }

  @Post('/send_to/:receiverId')
  @ApiOperation({ summary: 'Send MSG to Receiver' })
  @ApiParam({ name: 'receiverId', required: true, description: 'Receiver ID to send the MSG to' })
  async sendMsgToReceiver(@Param('receiverId') receiverId: string, @Body() msgData: CreateMsgDto) {
    const newMsg = new MSG();
    newMsg.senderName = msgData.senderName;
    newMsg.receiverId = receiverId;
    newMsg.title = msgData.title;
    newMsg.messageText = msgData.messageText;
    newMsg.sentAt = msgData.sentAt;
    newMsg.isRead = false;

    return this.msgService.create(newMsg);
  }
}