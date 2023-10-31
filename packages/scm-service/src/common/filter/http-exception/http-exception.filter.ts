import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiException } from './api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof ApiException) {
      response.status(status).json({
        code: exception.getErrorCode(),
        message: exception.getErrorMessage(),
      });
      return;
    }

    response.status(status).json({
      code: status,
      message: exception.message,
    });
  }
}
