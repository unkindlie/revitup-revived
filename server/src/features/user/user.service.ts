import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
    constructor(private repository: UserRepository) {}

    async getUsers() {
        return await this.repository.getAllUsers();
    }
    async createUser(input: UserCreateDto) {
        await this.repository.createUser(input);
    }
    async deleteUser(userId: number) {
        await this.repository.deleteUser(userId);
    }
}
