import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

import { AuthResponseDto } from '../dto/auth-response.dto';
import { CookieHelper } from '../helpers/cookie.helper';
import {
    REFRESH_TOKEN_LIFE_IN_MS,
    REFRESH_TOKEN_NAME,
} from '../constants/auth.constants';

@Injectable()
export class RefreshCookieInterceptor implements NestInterceptor {
    constructor(private cookieHelper: CookieHelper) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const res = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            tap((result: AuthResponseDto) => {
                this.cookieHelper.setCookie({
                    key: REFRESH_TOKEN_NAME,
                    value: result.tokens.refreshToken,
                    res,
                    options: {
                        maxAge: REFRESH_TOKEN_LIFE_IN_MS,
                    },
                });
            }),
        );
    }
}
