import { IBaseRepository } from "../common";
import { MSG } from "../../entities";

export interface IMsgRepository extends IBaseRepository<MSG> {

  findByReceiverId(receiverId: string): Promise<MSG[] | null>;
  findBySenderName(senderName: string): Promise<MSG[] | null>;
  findUnreadByReceiverId(receiverId: string, is): Promise<MSG[] | null>;

}