import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [MessagesModule],
  controllers: [StatsController],
})
export class StatsModule {}
