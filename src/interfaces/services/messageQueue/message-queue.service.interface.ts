import type { RmqContext } from '@nestjs/microservices';

export interface IMessageQueueService {
  acknowledgeMessage(context: RmqContext): void;
}
