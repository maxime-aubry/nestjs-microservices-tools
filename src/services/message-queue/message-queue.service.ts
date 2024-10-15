import { IMessageQueueService } from '@app/nestjs-microservices-tools/interfaces/services/messageQueue/message-queue.service.interface';
import { Injectable } from '@nestjs/common';
import type { RmqContext } from '@nestjs/microservices';

@Injectable()
export class MessageQueueService implements IMessageQueueService {
  public acknowledgeMessage(context: RmqContext): void {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
