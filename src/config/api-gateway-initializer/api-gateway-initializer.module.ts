import { LoggerModule } from '@app/nestjs-microservices-tools/services/logger';
import { type DynamicModule, Module, type Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import {
  EnvironmentConfigModule,
  EnvironmentConfigService,
  type IMessageQueueConfiguration,
} from '../environment-config';
import { ApiGatewayInitializerService } from './api-gateway-initializer.service';

@Module({
  imports: [EnvironmentConfigModule, LoggerModule],
  providers: [ApiGatewayInitializerService],
  exports: [ApiGatewayInitializerService],
})
export class ApiGatewayInitializerModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers: Provider[] = [
      {
        provide: service,
        useFactory: (config: IMessageQueueConfiguration) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [config.getMessageQueueUrl()],
              queue,
              queueOptions: {
                durable: true, // queue survives broker restart
              },
            },
          });
        },
        inject: [EnvironmentConfigService],
      },
    ];

    return {
      module: ApiGatewayInitializerModule,
      providers,
      exports: providers,
    };
  }
}
