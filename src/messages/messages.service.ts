import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageStatsDto } from './dto/message-stats.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messages: Repository<Message>,
  ) {}

  async save(data: CreateMessageDto): Promise<Message> {
    const msg = this.messages.create(data);
    return this.messages.save(msg);
  }

  async getRecent(limit: number = 100): Promise<Message[]> {
    return this.messages.find({
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }

  async getStats(): Promise<MessageStatsDto> {
    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const [
      total,
      recent,
      users,
      byType,
      sentiment,
      avgLen,
    ] = await Promise.all([
      this.messages.count(),
      this.messages
        .createQueryBuilder('m')
        .where('m.timestamp >= :hourAgo', { hourAgo })
        .getCount(),
      this.messages
        .createQueryBuilder('m')
        .select('COUNT(DISTINCT m.user)', 'count')
        .getRawOne()
        .then(r => parseInt(r.count)),
      this.messages
        .createQueryBuilder('m')
        .select('m.messageType', 'type')
        .addSelect('COUNT(*)', 'count')
        .groupBy('m.messageType')
        .getRawMany(),
      this.messages
        .createQueryBuilder('m')
        .select('m.metadata->>\'sentiment\'', 'sentiment')
        .addSelect('COUNT(*)', 'count')
        .groupBy('m.metadata->>\'sentiment\'')
        .getRawMany(),
      this.messages
        .createQueryBuilder('m')
        .select('AVG((m.metadata->>\'length\')::numeric)', 'avgLength')
        .getRawOne(),
    ]);

    const typeMap = {};
    byType.forEach(item => {
      typeMap[item.type] = parseInt(item.count);
    });

    const sentimentMap = {};
    sentiment.forEach(item => {
      sentimentMap[item.sentiment || 'unknown'] = parseInt(item.count);
    });

    return {
      totalMessages: total,
      messagesLastHour: recent,
      uniqueUsers: users,
      avgMessageLength: parseFloat(avgLen?.avgLength) || 0,
      messagesByType: typeMap,
      sentimentDistribution: sentimentMap,
    };
  }

  async clear(): Promise<{ deletedCount: number }> {
    const result = await this.messages.delete({});
    return { deletedCount: result.affected || 0 };
  }
}
