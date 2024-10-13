import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentConfiguration } from 'src/interfaces/config/environment-config/environment-config.service.interface';

@Injectable()
export class EnvironmentConfigService implements IEnvironmentConfiguration {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  public getEnvironment(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  public getMessageQueueUser(): string {
    return this.configService.get<string>('RABBITMQ_USER');
  }

  public getMessageQueuePass(): string {
    return this.configService.get<string>('RABBITMQ_PASS');
  }

  public getMessageQueueHost(): string {
    return this.configService.get<string>('RABBITMQ_HOST');
  }

  public getMessageQueueAuthQueue(): string {
    return this.configService.get<string>('RABBITMQ_AUTH_QUEUE');
  }

  public getMessageQueueUrl(): string {
    return `amqp://${this.getMessageQueueUser()}:${this.getMessageQueuePass()}@${this.getMessageQueueHost()}`;
  }
}
