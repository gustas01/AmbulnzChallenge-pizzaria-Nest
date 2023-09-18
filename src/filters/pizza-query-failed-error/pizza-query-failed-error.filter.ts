import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class PizzaQueryFailedErrorFilter<T> implements ExceptionFilter {
  code: string;
  message: string;
  status: HttpStatus;

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse<Response>();
    const request: Request = host.switchToHttp().getRequest<Request>();

    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = exception.driverError.detail;
    this.code = '500';

    switch (exception.driverError?.code) {
      case '23505':
        this.status = HttpStatus.UNPROCESSABLE_ENTITY;
        this.message = `Pizza ${request.body.name} já cadastrada!`;
        this.code = '23505';
        break;
      default:
        this.status = HttpStatus.SERVICE_UNAVAILABLE;
        this.message = exception.message;
        this.code = exception.driverError?.code ?? this.code;
        break;
    }

    response.status(this.status).json({
      status: this.status,
      message: this.message,
      code: this.code,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
