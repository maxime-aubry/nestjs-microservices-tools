import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import type { Request } from 'express';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseFormat<TContent> {
  constructor(isArray: boolean, path: string, duration: string, method: string, data: TContent) {
    this.isArray = isArray;
    this.path = path;
    this.duration = duration;
    this.method = method;
    this.data = data;
  }

  @ApiProperty()
  isArray: boolean;

  @ApiProperty()
  path: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  method: string;

  data: TContent;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const start: number = Date.now();
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const request: Request = httpContext.getRequest<Request>();

    return next.handle().pipe(
      map((data: any) => ({
        data,
        isArray: Array.isArray(data),
        path: request.path,
        duration: `${Date.now() - start}ms`,
        method: request.method,
      })),
    );
  }
}
