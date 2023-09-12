import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UserQueryFailedErrorFilter<T> implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse<Response>();
    const request: Request = host.switchToHttp().getRequest<Request>();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = exception.driverError.detail;
    let code: string = '500';

    switch (exception.driverError?.code) {
      case '23505':
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = `Username ${request.body.username} já existe!`;
        code = exception.driverError?.code;
        break;
      default:
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = exception.message;
        code = exception.driverError?.code;
        break;
    }

    response.status(status).json({
      status,
      message,
      code,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
