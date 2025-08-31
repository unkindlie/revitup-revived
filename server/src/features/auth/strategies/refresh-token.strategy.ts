import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import authConfig from 'features/auth/auth.config';
import { AuthService } from 'features/auth/auth.service';
import { AuthPayloadDto } from 'features/auth/dto/auth-payload.dto';
import { RefreshTokenExtractor } from 'features/auth/extractors/refresh-token.extractor';

import { DEFAULT_SECRET } from '../constants/auth.constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    @Inject(authConfig.KEY)
    private configObj: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshTokenExtractor]),
      secretOrKey: configObj.refresh.secret || DEFAULT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthPayloadDto) {
    const token = RefreshTokenExtractor(req);

    return await this.authService.refresh(payload.sub, token);
  }
}
