import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    ) {}

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.repo.find();
    }
    async createUser() {
        const entity = this.repo.create();

        await this.repo.insert(entity);
    }
    async deleteUser(userId: number) {
        await this.repo.delete(userId);
    }
}
