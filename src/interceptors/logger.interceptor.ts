import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { Request } from 'express';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { ILoggerService } from '../interfaces/services/logger/logger.interface';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ILoggerService) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now: number = Date.now();
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const request: Request = httpContext.getRequest<Request>();
    const ip: string = this.getIP(request);

    this.logger.log(`Incoming Request on ${request.path}`, `method=${request.method} ip=${ip}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request for ${request.path}`,
          `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
        );
      }),
    );
  }

  private getIP(request: Request): string {
    let ip: string;

    const ipAddr: string | null = request.headers['x-forwarded-for'] as string | null;

    if (ipAddr) {
      const list: string[] = ipAddr.split(',');
      ip = list[list.length - 1];
    } else {
      ip = request.socket.remoteAddress ?? '';
    }

    return ip.replace('::ffff:', '');
  }
}
