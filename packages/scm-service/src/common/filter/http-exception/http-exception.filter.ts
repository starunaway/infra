import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiException } from './api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

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

    if (exception instanceof BadRequestException) {
      const res = exception.getResponse() as Record<string, any> | string;
      response.status(status).json({
        code: ApiErrorCode.BadRequestException,
        message: typeof res === 'object' ? res?.message : res,
      });
      return;
    }

    response.status(status).json({
      code: status,
      message: exception.message,
    });
  }
}
