import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/dto/user-create.dto';

@Injectable()
export class AuthService {
    constructor(private userSerivce: UserService) {}

    async register(input: UserCreateDto) {
        await this.userSerivce.createUser(input);
    }
}
