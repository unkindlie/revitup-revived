import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userSerivce: UserService) {}

    async register() {
        await this.userSerivce.createUser();
    }
}
