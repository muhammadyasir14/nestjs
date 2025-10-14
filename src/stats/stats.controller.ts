import { Controller, Get } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { MessageStatsDto } from '../messages/dto/message-stats.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getStats(): Promise<MessageStatsDto> {
    return this.messagesService.getStats();
  }
}
