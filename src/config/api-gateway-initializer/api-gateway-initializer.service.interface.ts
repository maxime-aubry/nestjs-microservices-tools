import type { INestApplication } from '@nestjs/common';

export interface IApiGatewayInitializerService {
  initializeAsync(app: INestApplication<any>, port: number): Promise<void>;
}
