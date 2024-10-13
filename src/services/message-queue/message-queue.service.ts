import { Injectable } from '@nestjs/common';
import type { RmqContext } from '@nestjs/microservices';
import type { IMessageQueueService } from '../../interfaces/services/messageQueue/message-queue.service.interface';

@Injectable()
export class MessageQueueService implements IMessageQueueService {
  public acknowledgeMessage(context: RmqContext): void {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
