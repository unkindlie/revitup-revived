import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import authConfig from 'features/auth/auth.config';

type TokenType = 'access' | 'refresh';

@Injectable()
export class TokenHelper {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
  ) {}

  async signPayload(
    payload: Record<string, any>,
    type: TokenType,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { sub: payload },
      {
        secret: this.config[type].secret,
        expiresIn: this.config[type].expiresIn,
      },
    );
  }
  async verifyPayload<T>(token: string, type: TokenType): Promise<T> {
    return (await this.jwtService.verifyAsync(token, {
      secret: this.config[type].secret,
    })) as T;
  }
}
