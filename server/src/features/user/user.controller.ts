import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';

import { ExposingSerialization } from 'common/decorators/exposing-serialization.decorator';
import { PaginatedQuery } from 'common/types/pagination.type';
import { ValidatedArray } from 'common/types/validated-array.type';

import { UserShortDto } from 'features/user/dto/user-short.dto';
import { UserUpdateDto } from 'features/user/dto/user-update.dto';
import { UserService } from 'features/user/user.service';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @ExposingSerialization(ValidatedArray({ users: UserShortDto }))
  async getUsers(@Query() query: PaginatedQuery) {
    const [users, count] = await this.service.getUsers();

    return { users, count, query };
  }

  @Get(':id')
  @ExposingSerialization(UserShortDto)
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getUserById(id);
  }

  @Patch('update-profile')
  async updateInfo(@Body() body: UserUpdateDto) {
    await this.service.updateUserInfo(body);

    return { message: 'User profile successfully updated' };
  }

  @Delete('delete-profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Body('userId', ParseIntPipe) id: number) {
    await this.service.deleteUser(id);
  }
}
