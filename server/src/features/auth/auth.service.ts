import {
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { UserPayloadDto } from './dto/user-payload.dto';
import { TokensDto } from './dto/tokens.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { TokenHelper } from './helpers/token.helper';

import authConfig from './auth.config';

@Injectable()
export class AuthService {
    constructor(
        @Inject(authConfig.KEY)
        private config: ConfigType<typeof authConfig>,
        private userSerivce: UserService,
        private tokenHelper: TokenHelper,
    ) {}

    async register(input: UserCreateDto): Promise<void> {
        const exists = await this.userSerivce.userExistsByEmail(
            input.emailAddress,
        );
        if (exists)
            throw new ConflictException('User with such email already exists');

        const salt = parseInt(this.config.hashSaltAmount!);
        input.password = await hash(input.password, salt);

        await this.userSerivce.createUser(input);
    }
    async login(
        emailAddress: string,
        password: string,
    ): Promise<AuthResponseDto> {
        const user = await this.userSerivce.getUserByEmail(emailAddress);

        const isPasswordMatching = await compare(password, user.password);
        if (!isPasswordMatching)
            throw new ForbiddenException("Password doesn't match");

        const payload = plainToInstance(UserPayloadDto, user, {
            excludeExtraneousValues: true,
        });

        return {
            user: payload,
            tokens: await this.generateTokens(payload),
        };
    }
    async refresh(payload: UserPayloadDto): Promise<AuthResponseDto> {
        const user = await this.userSerivce.getUserByEmail(
            payload.emailAddress,
        );
        const newPayload = plainToInstance(UserPayloadDto, user, {
            excludeExtraneousValues: true,
        });
        return {
            user: newPayload,
            tokens: await this.generateTokens(newPayload),
        };
    }
    private async generateTokens(payload: UserPayloadDto): Promise<TokensDto> {
        const plain = instanceToPlain(payload);

        const accessToken = await this.tokenHelper.signPayload(plain, 'access');
        const refreshToken = await this.tokenHelper.signPayload(
            plain,
            'refresh',
        );

        return {
            accessToken,
            refreshToken,
        };
    }
}
