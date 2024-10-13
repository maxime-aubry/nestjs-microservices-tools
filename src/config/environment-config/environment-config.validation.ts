import type { ValidationError } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  constructor(
    nodeEnv: Environment,
    rabbitMqUser: string,
    rabbitMqPass: string,
    rabbitMqHost: string,
    rabbitMqAuthQueue: string,
  ) {
    this.NODE_ENV = nodeEnv;
    this.RABBITMQ_USER = rabbitMqUser;
    this.RABBITMQ_PASS = rabbitMqPass;
    this.RABBITMQ_HOST = rabbitMqHost;
    this.RABBITMQ_AUTH_QUEUE = rabbitMqAuthQueue;
  }

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  RABBITMQ_USER: string;

  @IsString()
  RABBITMQ_PASS: string;

  @IsString()
  RABBITMQ_HOST: string;

  @IsString()
  RABBITMQ_AUTH_QUEUE: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig: EnvironmentVariables = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors: ValidationError[] = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}
