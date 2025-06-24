import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { AccessTokenGuard } from './guards/access-token.guard';
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
    @UseInterceptors(new CookieInterceptor('refreshToken'))
    login(@User() user: AuthResponseDto) {
        return user;
    }

    @Get('verify')
    @UseGuards(AccessTokenGuard)
    verifyUser(@User() user: UserPayloadDto) {
        return user.emailAddress;
    }
}
