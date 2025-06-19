import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserShortDto } from './dto/user-short.dto';
import { ValidatedArray } from '../../common/types/validated-array.type';
import { ExposingSerialization } from '../../common/decorators/exposing-serialization.decorator';

@Controller('users')
export class UserController {
    constructor(private service: UserService) {}

    @Get()
    @ExposingSerialization(ValidatedArray({ users: UserShortDto }))
    async getUsers() {
        const users = await this.service.getUsers();

        return { users };
    }

    @Get(':id')
    @ExposingSerialization(UserShortDto)
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.service.getUserById(id);
    }

    @Delete('delete-profile')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Body('userId', ParseIntPipe) id: number) {
        await this.service.deleteUser(id);
    }
}
