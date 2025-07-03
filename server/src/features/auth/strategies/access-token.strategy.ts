import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthPayloadDto } from '../dto/auth-payload.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow('authConfig.access.secret'),
        });
    }

    validate(payload: AuthPayloadDto) {
        return payload.sub;
    }
}
