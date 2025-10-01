import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { extractErrorNameFromClass } from 'common/helpers/common.helpers';

type ExceptionRes = {
  message: string;
  fields?: Record<string, string>;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    exception.name = extractErrorNameFromClass(exception.name);

    const exRes = exception.getResponse() as ExceptionRes;

    res.status(exception.getStatus());
    res.send({
      statusCode: res.statusCode,
      path: req.path,
      date: new Date(),
      response: {
        data: null,
        error: {
          name: exception.name,
          ...exRes,
        },
      },
    });
  }
}
