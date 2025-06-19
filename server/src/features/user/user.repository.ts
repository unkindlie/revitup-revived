import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    ) {}

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.repo.find();
    }
    // TODO: create method for availability of user acc
    async createUser(input: UserCreateDto) {
        const exists = await this.repo.existsBy({
            emailAddress: input.emailAddress,
        });
        if (exists)
            throw new ConflictException('User with such email already exists');

        const entity = this.repo.create(input);

        await this.repo.insert(entity);
    }
    async deleteUser(userId: number) {
        await this.repo.delete(userId);
    }
}
