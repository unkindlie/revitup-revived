import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/dto/user-create.dto';

@Injectable()
export class AuthService {
    constructor(
        private userSerivce: UserService,
        private configService: ConfigService,
    ) {}

    async register(input: UserCreateDto) {
        const salt =
            this.configService.get<number>('authConfig.hashSaltAmount') || 0;
        input.password = await hash(input.password, salt);

        await this.userSerivce.createUser(input);
    }
}
