import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();

        const statusCode = res.statusCode;

        return next.handle().pipe(
            map((value) => ({
                statusCode,
                path: req.path,
                date: new Date(),
                response: {
                    data: (value as unknown) || null,
                    error: null,
                },
            })),
        );
    }
}
