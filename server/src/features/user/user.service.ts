import { Injectable } from '@nestjs/common';

import { UserCreateDto, UserUpdateDto } from 'features/user/dto';
import { UserEntity } from 'features/user/user.entity';
import { UserRepository } from 'features/user/user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async getUsers(): Promise<[UserEntity[], number]> {
    return await this.repository.getUsers();
  }
  async getUserById(id: number): Promise<UserEntity> {
    return await this.repository.getUserByCondition({ id });
  }
  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.repository.getUserByCondition({ email });
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

  async userExistsById(id: number) {
    return await this.repository.existsBy({ id });
  }
  async userExistsByEmail(emailAddress: string): Promise<boolean> {
    return await this.repository.existsBy({ email: emailAddress });
  }
}
