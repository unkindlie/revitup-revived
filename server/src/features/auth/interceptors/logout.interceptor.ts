import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, mergeMap } from 'rxjs';

import { REFRESH_TOKEN_NAME } from 'features/auth/constants/auth.constants';
import { CookieHelper } from 'features/auth/helpers/cookie.helper';
import { RefreshTokenService } from 'features/refresh-token/refresh-token.service';

@Injectable()
export class LogoutInterceptor implements NestInterceptor {
  constructor(
    private tokenService: RefreshTokenService,
    private cookieHelper: CookieHelper,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      mergeMap(async () => {
        const refreshToken = req.cookies[REFRESH_TOKEN_NAME] as
          | string
          | undefined;
        if (refreshToken === undefined) {
          throw new UnauthorizedException(
            'Refresh token is not found in cookies',
          );
        }

        this.cookieHelper.clearCookie(REFRESH_TOKEN_NAME, res);

        await this.tokenService.removeToken(refreshToken);
      }),
    );
  }
}
