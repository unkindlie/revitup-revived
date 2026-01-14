import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthPayloadDto } from 'features/auth/dto';

@Injectable()
export class AccessTokenGuard extends AuthGuard('access') {
  handleRequest<TUser extends AuthPayloadDto>(err: any, user: TUser): TUser {
    if (!user || err) {
      throw new UnauthorizedException('Payload is not valid');
    }

    return user;
  }
}
