import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { MicroserviceInitializerService } from './microservice-initializer.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [MicroserviceInitializerService],
  exports: [MicroserviceInitializerService],
})
export class MicroserviceInitializerModule {}
