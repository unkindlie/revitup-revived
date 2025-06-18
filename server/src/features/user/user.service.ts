import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private repository: UserRepository) {}

    async getUsers() {
        return await this.repository.getAllUsers();
    }
    async createUser() {
        await this.repository.createUser();
    }
    async deleteUser(userId: number) {
        await this.repository.deleteUser(userId);
    }
}
