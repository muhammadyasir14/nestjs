export class MessageStatsDto {
  totalMessages: number;
  messagesLastHour: number;
  uniqueUsers: number;
  avgMessageLength: number;
  messagesByType: Record<string, number>;
  sentimentDistribution: Record<string, number>;
}
