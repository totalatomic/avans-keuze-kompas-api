import { UUID } from 'crypto';

export class SendMsgDto {

    private readonly id          : UUID;
    private readonly description : string;
    private readonly user_id     : string;
    private readonly from_user_id: string;
    private readonly is_read     : boolean;
    
        constructor() {
    
        }
}