import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/user-create.dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('register')
    async register(@Body() body: UserCreateDto) {
        await this.service.register(body);

        return { message: 'User was successfully created' };
    }
}
