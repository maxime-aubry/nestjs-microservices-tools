import { IEnvironmentConfiguration } from '@app/nestjs-microservices-tools/interfaces/config/environment-config/environment-config.service.interface';
import { IMessageQueueConfiguration } from '@app/nestjs-microservices-tools/interfaces/config/environment-config/message-queue-config.service.interface';
import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'bun:test';
import { EnvironmentConfigModule } from './environment-config.module';
import { EnvironmentConfigService } from './environment-config.service';

describe('Tests for EnvironmentConfigService', () => {
  let configuration: IEnvironmentConfiguration;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentConfigModule],
      providers: [EnvironmentConfigService],
    }).compile();

    configuration = module.get(EnvironmentConfigService);
  });

  it('EnvironmentConfigService should provide paramters from .env.test file', () => {
    const environmentConfigration: IEnvironmentConfiguration = configuration;
    expect(environmentConfigration).toBeDefined();
    expect(environmentConfigration.getEnvironment()).toEqual('test');

    const messageQueueConfiguration: IMessageQueueConfiguration = configuration;
    expect(messageQueueConfiguration).toBeDefined();
    expect(messageQueueConfiguration.getMessageQueueUser()).toEqual('user');
    expect(messageQueueConfiguration.getMessageQueuePass()).toEqual('password');
    expect(messageQueueConfiguration.getMessageQueueHost()).toEqual('rabbitmq:5672');
    expect(messageQueueConfiguration.getMessageQueueAuthQueue()).toEqual('auth_queue');
    expect(messageQueueConfiguration.getMessageQueueUrl()).toEqual('amqp://user:password@rabbitmq:5672');
  });
});
