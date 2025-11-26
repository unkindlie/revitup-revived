import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

import {
  REFRESH_TOKEN_LIFE_IN_MS,
  REFRESH_TOKEN_NAME,
} from 'features/auth/constants/auth.constants';
import { AuthResponseDto } from 'features/auth/dto';
import { CookieHelper } from 'features/auth/helpers/cookie.helper';

@Injectable()
export class RefreshCookieInterceptor implements NestInterceptor {
  constructor(private cookieHelper: CookieHelper) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap({
        next: (result: AuthResponseDto) => {
          this.cookieHelper.setCookie({
            key: REFRESH_TOKEN_NAME,
            value: result.tokens.refreshToken,
            res,
            options: {
              maxAge: REFRESH_TOKEN_LIFE_IN_MS,
            },
          });
        },
      }),
    );
  }
}
