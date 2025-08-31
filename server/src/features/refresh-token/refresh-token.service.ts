import { Injectable } from '@nestjs/common';

import { AuthPayloadDto } from 'features/auth/dto/auth-payload.dto';
import { TokenHelper } from 'features/auth/helpers/token.helper';
import { RefreshTokenRepository } from 'features/refresh-token/refresh-token.repository';

import { RefreshTokensPairDto } from './dto/refresh-tokens-pair.dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    private repo: RefreshTokenRepository,
    private tokenHelper: TokenHelper,
  ) {}

  async createTokenEntry(refreshToken: string): Promise<void> {
    const {
      sub: { id },
    } = await this.tokenHelper.verifyPayload<AuthPayloadDto>(
      refreshToken,
      'refresh',
    );

    await this.repo.addToken(refreshToken, id);
  }
  async updateTokenEntry(tokens: RefreshTokensPairDto): Promise<void> {
    await this.repo.updateTokenEntry(tokens);
  }
  async removeToken(refreshToken: string): Promise<void> {
    await this.repo.removeToken(refreshToken);
  }
  async isTokenAvailable(token: string): Promise<boolean> {
    return this.repo.isTokenAvailable(token);
  }
}
