import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenExtractor } from '../extractors/refresh-token.extractor';
import { AuthPayloadDto } from '../dto/auth-payload.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'refresh',
) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([RefreshTokenExtractor]),
            secretOrKey: configService.getOrThrow('authConfig.refresh.secret'),
        });
    }

    async validate(payload: AuthPayloadDto) {
        return await this.authService.refresh(payload.sub);
    }
}
