import { IApiGatewayInitializerService } from '@app/shared/interfaces/config/api-gateway-initializer/api-gateway-initializer.service.interface';
import { type INestApplication, Inject, Injectable, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from '../../filters/exception.filter';
import { LoggingInterceptor } from '../../interceptors/logger.interceptor';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';
import type { ILoggerService } from '../../interfaces/services/logger/logger.interface';
import { LoggerService } from '../../services/logger/logger.service';

@Injectable()
export class ApiGatewayInitializerService implements IApiGatewayInitializerService {
  constructor(@Inject(LoggerService) private readonly loggerService: ILoggerService) {}

  public async initializeAsync(app: INestApplication<any>, port: number): Promise<void> {
    this.addFilters(app);
    this.addPipes(app);
    this.addInterceptors(app);
    app.enableCors();
    await app.startAllMicroservices();
    await app.listen(port);
  }

  private addFilters(app: INestApplication<any>): void {
    app.useGlobalFilters(new AllExceptionFilter(this.loggerService));
  }

  private addPipes(app: INestApplication<any>): void {
    app.useGlobalPipes(new ValidationPipe());
  }

  private addInterceptors(app: INestApplication<any>): void {
    app.useGlobalInterceptors(new LoggingInterceptor(this.loggerService));
    app.useGlobalInterceptors(new ResponseInterceptor());
  }
}
