import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
import { validate } from './environment-config.validation';

const ignoreEnvFile = (): boolean => {
  if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') return false;
  return true;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: ignoreEnvFile(),
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
