import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private getExceptionStatus(exception: HttpException) {
    return exception instanceof HttpException ? exception.getStatus() : 500;
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = this.getExceptionStatus(exception);

    const getErrorMessage = (error: any) => {
      console.log(error);

      if (Object.hasOwn(error, 'response')) {
        return error.response.message;
      }

      if (Object.hasOwn(error, 'message')) {
        return error.message;
      }

      return error;
    };

    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: getErrorMessage(exception),
    });
  }
}
