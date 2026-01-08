import { BaseEntity } from '../common/index';
export class MSG extends BaseEntity {

    senderName: string;
    receiverId: string;
    title: string;
    messageText: string;
    sentAt: Date;
    isRead: boolean;
}
