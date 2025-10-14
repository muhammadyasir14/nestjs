import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  @IsIn(['chat', 'system', 'alert', 'notification'])
  messageType?: string = 'chat';
}
