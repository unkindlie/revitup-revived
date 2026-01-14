import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokensPairDto } from 'features/refresh-token/dto/refresh-tokens-pair.dto';
import { RefreshTokenEntity as Entity } from 'features/refresh-token/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(Entity)
    private repo: Repository<Entity>,
  ) {}

  async addToken(token: string, userId: number): Promise<void> {
    const entity = this.repo.create({ token, user: { id: userId } });

    await this.repo.insert(entity);
  }
  async updateTokenEntry({
    oldToken,
    newToken,
  }: RefreshTokensPairDto): Promise<void> {
    await this.repo.update({ token: oldToken }, { token: newToken });
  }
  async removeToken(token: string): Promise<void> {
    await this.repo.delete({ token });
  }
  async isTokenAvailable(token: string): Promise<boolean> {
    return this.repo.existsBy({ token });
  }
}
