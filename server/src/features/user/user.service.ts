import { Injectable } from '@nestjs/common';

import { UserCreateDto, UserUpdateDto } from 'features/user/dto';
import { UserEntity } from 'features/user/user.entity';
import { UserRepository } from 'features/user/user.repository';
import { UserImageService } from '../user-images/user-image.service';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private userImageSerivce: UserImageService,
  ) {}

  async getUsers(): Promise<[UserEntity[], number]> {
    return await this.repository.getUsers();
  }
  async getUserById(id: number) {
    const user = await this.repository.getUserByCondition({ id });
    const profileImg = await this.userImageSerivce.getLatestUserImage(id);

    return {
      ...user,
      profileImg,
    };
  }
  async getUserByEmail(email: string) {
    const user = await this.repository.getUserByCondition({ email });
    const profileImg = await this.userImageSerivce.getLatestUserImage(user.id);

    return {
      ...user,
      profileImg,
    };
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
