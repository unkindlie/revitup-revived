import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private service: UserService) {}

    @Get()
    async getUsers() {
        const users = await this.service.getUsers();

        return { users };
    }

    @Delete('delete-profile')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Body('userId', ParseIntPipe) id: number) {
        await this.service.deleteUser(id);
    }
}
