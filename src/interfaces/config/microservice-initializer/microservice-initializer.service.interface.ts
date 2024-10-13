import type { INestApplication } from '@nestjs/common';

export interface IMicroserviceInitializerService {
  initializeAsync(app: INestApplication<any>, queue: string): Promise<void>;
}
