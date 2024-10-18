import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IEnvironmentConfiguration } from './environment-config.interface';

@Injectable()
export class EnvironmentConfigService implements IEnvironmentConfiguration {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  public getEnvironment(): string {
    return this.configService.get<string>('NODE_ENV') ?? '';
  }

  public getMessageQueueAuthQueue(): string {
    return this.configService.get<string>('RABBITMQ_AUTH_QUEUE') ?? '';
  }

  public getMessageQueueUrl(): string {
    return this.configService.get<string>('RABBITMQ_URI') ?? '';
  }

  public getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') ?? '';
  }

  public getJwtExpirationTime(): number {
    return this.configService.get<number>('JWT_EXPIRATION_TIME') ?? 0;
  }

  public getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') ?? '';
  }

  public getJwtRefreshExpirationTime(): number {
    return this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') ?? 0;
  }
}
