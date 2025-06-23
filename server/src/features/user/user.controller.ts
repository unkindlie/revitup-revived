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

import { UserService } from './user.service';
import { UserShortDto } from './dto/user-short.dto';
import { ValidatedArray } from '../../common/types/validated-array.type';
import { ExposingSerialization } from '../../common/decorators/exposing-serialization.decorator';
import { PaginatedQuery } from '../../common/types/pagination.type';
import { UserUpdateDto } from './dto/user-update.dto';

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
