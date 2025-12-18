import {BadRequestException, Scope, UnauthorizedException, Inject, Injectable} from '@nestjs/common';
import {CreateMsgDto, GetMsgDto, SendMsgDto } from '../dto/index';

@Injectable({ scope: Scope.REQUEST })
export class MsgService {
    
    constructor(
        
    ) {}

    async sendMsg(): Promise<void> {}

    async createMsg(CreateMsgDto: CreateMsgDto): Promise<void> {
        //logic to create a message
    }

    async postMsg(SendMsgDto: SendMsgDto): Promise<void> {
        //logic to post a message
    }

    async getMsgByUserId(user_id: string): Promise<GetMsgDto> {
        //logic to get messages by user id
    }
    
    async getUnreadMsgByUserId(user_id: string): Promise<GetMsgDto[]> {
        //logic to get unread messages by user id
    }
    
    async updateMsgReadStatus(msg_id: string, is_read: boolean): Promise<void> {
        //logic to update message read status
    }


}