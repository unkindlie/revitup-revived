import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { UserEntity } from './user.entity';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
    constructor(private repository: UserRepository) {}

    async getUsers(): Promise<[UserEntity[], number]> {
        return await this.repository.getUsers();
    }
    async getUserById(id: number): Promise<UserEntity> {
        return await this.repository.getUserByCondition({ id });
    }
    async getUserByEmail(emailAddress: string): Promise<UserEntity> {
        return await this.repository.getUserByCondition({ emailAddress });
    }
    async createUser(input: UserCreateDto): Promise<void> {
        await this.repository.createUser(input);
    }
    async updateUserInfo(input: UserUpdateDto): Promise<void> {
        await this.repository.updateUserInfo(input);
    }
    async deleteUser(userId: number): Promise<void> {
        await this.repository.deleteUser(userId);
    }
}
