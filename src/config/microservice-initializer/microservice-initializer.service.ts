import { IMessageQueueConfiguration } from '@app/shared/interfaces/config/environment-config/message-queue-config.service.interface';
import { IMicroserviceInitializerService } from '@app/shared/interfaces/config/microservice-initializer/microservice-initializer.service.interface';
import { type INestApplication, Inject, Injectable } from '@nestjs/common';
import { type RmqOptions, Transport } from '@nestjs/microservices';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

@Injectable()
export class MicroserviceInitializerService implements IMicroserviceInitializerService {
  constructor(@Inject(EnvironmentConfigService) private readonly config: IMessageQueueConfiguration) {}

  public async initializeAsync(app: INestApplication<any>, queue: string): Promise<void> {
    this.addMessageQueueListener(app, queue);
    await app.startAllMicroservices();
  }

  private addMessageQueueListener(app: INestApplication<any>, queue: string): void {
    const options: RmqOptions = this.getOptions(queue);
    app.connectMicroservice(options);
  }

  private getOptions(queue: string): RmqOptions {
    const options: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [this.config.getMessageQueueUrl()],
        noAck: false,
        queue,
        queueOptions: {
          durable: true, // queue survives broker restart
        },
      },
    };
    return options;
  }
}
