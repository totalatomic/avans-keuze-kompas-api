import { CreateMsgDto } from "src/application/msg/dto";

export interface IMsgRepository {
    
    createMsg(description: string, 
        user_id: string, 
        from_user_id: string, 
        is_read: boolean
    ): Promise<CreateMsgDto>;

    getMsgById(id: string): Promise<CreateMsgDto | null>;

    getMsgUnreadById(id: string): Promise<CreateMsgDto[] | null>;

    markMsgAsRead(id: string): Promise<void>;
}