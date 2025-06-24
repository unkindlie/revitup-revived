import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

import { AuthResponseDto } from '../dto/auth-response.dto';

// TODO: elaborate more on properties or decide to make it in helper
@Injectable()
export class CookieInterceptor implements NestInterceptor {
    private propertyName: string;

    constructor(propertyName: string) {
        this.propertyName = propertyName;
    }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const res = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            tap((value: AuthResponseDto) => {
                res.cookie(this.propertyName, value.tokens.refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                });
            }),
        );
    }
}
