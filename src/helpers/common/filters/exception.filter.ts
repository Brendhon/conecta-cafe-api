import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseModel } from '../models/response.model';
import ResponseFactory from '../../factory/response-factory';

interface ExceptionResponseError {
  statusCode: number;
  message: string[];
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const { message } = exception.getResponse() as ExceptionResponseError;

    const resp: ResponseModel = ResponseFactory({}, { message: message });

    response.status(status).json(resp);
  }
}
