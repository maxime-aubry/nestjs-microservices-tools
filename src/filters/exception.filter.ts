import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { Request, Response } from 'express';
import type { ILoggerService } from '../interfaces/services/logger/logger.interface';

interface IError {
  message: string;
  code_error: string | null;
}

class GlobalException implements IError {
  constructor(message: string, code_error: string | null, status: number, stack: any) {
    this.message = message;
    this.code_error = code_error;
    this.status = status;
    this.stack = stack;
  }

  public message: string;
  public code_error: string | null;
  public status: number;
  public stack: string | null;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ILoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse();
    const request: Request = context.getRequest();
    const globalException: GlobalException = this.getGlobalException(exception);

    const responseData = {
      ...{
        statusCode: globalException.status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      ...(globalException as IError),
    };

    this.logMessage(request, globalException);

    response.status(globalException.status).json(responseData);
  }

  private getGlobalException(exception: any): GlobalException {
    const message: string = this.getMessage(exception);
    const codeError: string | null = this.getCodeError(exception);
    const status: number = this.getStatus(exception);
    const stack: string | null = this.getStack(exception);
    const error: GlobalException = new GlobalException(message, codeError, status, stack);
    return error;
  }

  private getMessage(exception: any): string {
    if (exception instanceof HttpException) {
      const error: IError = exception.getResponse() as IError;
      return error.message;
    }

    const error: Error = exception as Error;
    return error.message;
  }

  private getCodeError(exception: any): string | null {
    if (exception instanceof HttpException) {
      const error: IError = exception.getResponse() as IError;
      return error.code_error;
    }

    return null;
  }

  private getStatus(exception: any): number {
    if (exception instanceof HttpException) return exception.getStatus();
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getStack(exception: any): string | null {
    return exception.stack ?? null;
  }

  private logMessage(request: any, exception: GlobalException): void {
    if (exception.status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${exception.status} code_error=${exception.code_error} message=${exception.message}`,
        exception.stack ?? '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${exception.status} code_error=${exception.code_error} message=${exception.message}`,
      );
    }
  }
}
