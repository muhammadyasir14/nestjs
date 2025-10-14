import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageStatsDto } from './dto/message-stats.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() data: CreateMessageDto) {
    return this.messagesService.save(data);
  }

  @Get()
  async getMessages(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 100;
    return this.messagesService.getRecent(limitNum);
  }

  @Get('stats')
  async stats(): Promise<MessageStatsDto> {
    return this.messagesService.getStats();
  }

  @Delete()
  async clear() {
    return this.messagesService.clear();
  }
}
