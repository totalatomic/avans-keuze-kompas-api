
import { randomUUID, UUID } from 'crypto';

export class CreateMsgDto {

    readonly id: UUID;
    readonly description: string;
    readonly user_id: string;
    readonly from_user_id: string;
    readonly is_read: boolean;
    
    constructor(description: string, user_id: string, from_user_id: string, is_read: boolean) {
        this.id = randomUUID();
        this.description = description;

        if (user_id.length < 32 || user_id === null) {
            throw new Error("Invalid User ID");
        }
        this.user_id = user_id;

        if (from_user_id.length < 32 || from_user_id === null) {
            throw new Error("Invalid From User ID");
        }

        this.from_user_id = from_user_id;
        this.is_read = is_read;
    }



    
       
}