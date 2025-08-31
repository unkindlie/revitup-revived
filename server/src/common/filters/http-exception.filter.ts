import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    res.status(exception.getStatus());
    res.send({
      statusCode: res.statusCode,
      path: req.path,
      date: new Date(),
      response: {
        data: null,
        error: {
          name: (exception.getResponse() as { error: string }).error,
          message: (
            exception.getResponse() as {
              message: string | string[];
            }
          ).message,
        },
      },
    });
  }
}
