import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import authConfig from 'features/auth/auth.config';
import { DEFAULT_SECRET } from 'features/auth/constants/auth.constants';
import { AuthPayloadDto } from 'features/auth/dto/auth-payload.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private configService: ConfigService,
    @Inject(authConfig.KEY)
    private configObj: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configObj.access.secret || DEFAULT_SECRET,
    });
  }

  validate(payload: AuthPayloadDto) {
    return payload.sub;
  }
}
