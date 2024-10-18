import type { IJwtConfiguration } from './jwt-config.interface';
import type { IMessageQueueConfiguration } from './message-queue-config.interface';

export interface IEnvironmentConfiguration extends IMessageQueueConfiguration, IJwtConfiguration {
  getEnvironment(): string;
}
