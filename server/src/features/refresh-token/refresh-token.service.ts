import { Injectable } from '@nestjs/common';
import { TokenHelper } from '../auth/helpers/token.helper';
import { UserPayloadDto } from '../auth/dto/user-payload.dto';
import { RefreshTokenRepository } from './refresh-token.repository';

@Injectable()
export class RefreshTokenService {
    constructor(
        private repo: RefreshTokenRepository,
        private tokenHelper: TokenHelper,
    ) {}

    async createTokenEntry(refreshToken: string): Promise<void> {
        const { id } = await this.tokenHelper.verifyPayload<UserPayloadDto>(
            refreshToken,
            'refresh',
        );

        await this.repo.addToken(refreshToken, id);
    }
}
