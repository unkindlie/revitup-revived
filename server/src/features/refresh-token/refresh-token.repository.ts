import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenRepository {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private repo: Repository<RefreshTokenEntity>,
    ) {}

    async addToken(token: string, userId: number): Promise<void> {
        const entity = this.repo.create({ token, user: { id: userId } });

        await this.repo.insert(entity);
    }
}
