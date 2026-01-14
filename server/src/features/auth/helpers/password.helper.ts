import { Inject, Injectable } from '@nestjs/common';
import authConfig from '../auth.config';
import { ConfigType } from '@nestjs/config';
import { hash } from 'bcrypt';

@Injectable()
export class PasswordHelper {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  async hashPassword(password: string) {
    const salt = parseInt(this.config.hashSaltAmount ?? '3');

    return await hash(password, salt);
  }
}
