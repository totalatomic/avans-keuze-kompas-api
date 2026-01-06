import { BaseEntity } from '../common/index';
export class MSG extends BaseEntity {

    senderName: string;
    receiverId: string;
    title: string;
    messagetext: string;
    sentAt: Date;
    isRead: boolean;
}
