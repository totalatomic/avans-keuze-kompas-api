import { IsString, IsDefined } from "class-validator";

export class CreateMsgDto {
  @IsString()
  @IsDefined()
  senderName: string;

  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  messageText: string;
}
