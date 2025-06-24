import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { UserPayloadDto } from './dto/user-payload.dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('register')
    async register(@Body() body: UserCreateDto) {
        await this.service.register(body);

        return { message: 'User was successfully created' };
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@User() user: UserPayloadDto) {
        return user;
    }
}
