import { ILoggerService } from '@app/nestjs-microservices-tools/interfaces/services/logger/logger.interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger implements ILoggerService {
  public debug(context: string, message: string): void {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }

  public log(context: string, message: string): void {
    super.log(`[INFO] ${message}`, context);
  }

  public error(context: string, message: string, trace?: string): void {
    super.error(`[ERROR] ${message}`, trace, context);
  }

  public warn(context: string, message: string): void {
    super.warn(`[WARN] ${message}`, context);
  }

  public verbose(context: string, message: string): void {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
