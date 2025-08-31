import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { UserCreateDto } from 'features/user/dto/user-create.dto';
import { UserUpdateDto } from 'features/user/dto/user-update.dto';
import { UserEntity } from 'features/user/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<[UserEntity[], number]> {
    return await this.repo.findAndCount();
  }
  async getUserByCondition(
    condition: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity> {
    const entity = await this.repo.findOneBy(condition);
    if (!entity) throw new NotFoundException("Such user doesn't exist");

    return entity;
  }
  async createUser(input: UserCreateDto): Promise<void> {
    const entity = this.repo.create(input);

    await this.repo.insert(entity);
  }
  async updateUserInfo(input: UserUpdateDto): Promise<void> {
    const { id, ...rest } = input;

    await this.repo.update(id, rest);
  }
  async deleteUser(userId: number): Promise<void> {
    await this.repo.delete(userId);
  }
  async existsBy(options: FindOptionsWhere<UserEntity>): Promise<boolean> {
    return await this.repo.existsBy(options);
  }
}
