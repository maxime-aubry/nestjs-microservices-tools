import type { IMessageQueueConfiguration } from './message-queue-config.service.interface';

export interface IEnvironmentConfiguration extends IMessageQueueConfiguration {
  getEnvironment(): string;
}
