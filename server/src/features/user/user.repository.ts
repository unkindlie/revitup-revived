import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    ) {}

    async getUsers(): Promise<UserEntity[]> {
        return await this.repo.find();
    }
    async getUserByCondition(
        condition: FindOptionsWhere<UserEntity>,
    ): Promise<UserEntity> {
        const entity = await this.repo.findOneBy(condition);
        if (!entity) throw new NotFoundException("Such user doesn't exist");

        return entity;
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
