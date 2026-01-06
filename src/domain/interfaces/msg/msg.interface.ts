import { IBaseRepository } from "../common";
import { MSG } from "../../entities/index";

export interface IMsgRepository extends IBaseRepository<MSG> {

    findByReceiverId(receiverId: string)          : Promise<MSG[]>;
    findBySenderName(senderName: string)          : Promise<MSG[]>;
    findUnreadByReceiverId(receiverId: string, is): Promise<MSG[]>;

}