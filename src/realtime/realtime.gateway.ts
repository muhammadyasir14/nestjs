import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['*'],
    credentials: true,
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger(RealtimeGateway.name);
  private clients = new Map<string, Socket>();

  constructor(private messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    this.clients.set(client.id, client);
    this.logger.log(`Client connected: ${client.id}`);
    
    client.emit('connected', {
      clientId: client.id,
      timestamp: new Date().toISOString(),
    });

    this.sendStats(client);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const msg = this.addMetadata(data);
      const saved = await this.messagesService.save(msg);
      
      this.server.emit('message', saved);
      this.broadcastStats();

      this.logger.log(`Message sent: ${saved.id}`);
    } catch (error) {
      this.logger.error(`Message error: ${error.message}`);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('stats')
  async handleStats(@ConnectedSocket() client: Socket) {
    await this.sendStats(client);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong');
  }

  private addMetadata(data: CreateMessageDto): CreateMessageDto {
    const content = data.content;
    const metadata = {
      length: content.length,
      wordCount: content.split(/\s+/).length,
      hasUrl: /https?:\/\/[^\s]+/.test(content),
      sentiment: this.getSentiment(content),
      processedAt: new Date(),
    };

    return {
      ...data,
      metadata,
    } as any;
  }

  private getSentiment(text: string): string {
    const positive = ['good', 'great', 'awesome', 'love', 'happy', 'amazing'];
    const negative = ['bad', 'terrible', 'hate', 'sad', 'awful', 'angry'];
    
    const lower = text.toLowerCase();
    const pos = positive.filter(word => lower.includes(word)).length;
    const neg = negative.filter(word => lower.includes(word)).length;
    
    if (pos > neg) return 'positive';
    if (neg > pos) return 'negative';
    return 'neutral';
  }

  private async sendStats(client: Socket) {
    try {
      const stats = await this.messagesService.getStats();
      client.emit('stats', stats);
    } catch (error) {
      this.logger.error(`Stats error: ${error.message}`);
    }
  }

  private async broadcastStats() {
    try {
      const stats = await this.messagesService.getStats();
      this.server.emit('stats', stats);
    } catch (error) {
      this.logger.error(`Broadcast error: ${error.message}`);
    }
  }

  broadcastSystemMessage(message: string) {
    this.server.emit('system', { message });
  }

  getClientCount(): number {
    return this.clients.size;
  }
}
