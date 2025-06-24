import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { UserPayloadDto } from './dto/user-payload.dto';
import { TokensDto } from './dto/tokens.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private userSerivce: UserService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    async register(input: UserCreateDto): Promise<void> {
        const salt = parseInt(
            this.configService.getOrThrow<string>('authConfig.hashSaltAmount'),
        );
        input.password = await hash(input.password, salt);

        await this.userSerivce.createUser(input);
    }
    async login(
        emailAddress: string,
        password: string,
    ): Promise<AuthResponseDto> {
        const user = await this.userSerivce.getUserByEmail(emailAddress);
        if (!user) throw new UnauthorizedException("This user doesn't exist");

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
    private async generateTokens(payload: UserPayloadDto): Promise<TokensDto> {
        const plain = instanceToPlain(payload);
        const accessToken = await this.jwtService.signAsync(
            { sub: plain },
            {
                secret: this.configService.get('authConfig.accessTokenSecret'),
                expiresIn: this.configService.get(
                    'authConfig.accessTokenExpiresIn',
                ),
            },
        );
        const refreshToken = await this.jwtService.signAsync(
            { sub: plain },
            {
                secret: this.configService.get('authConfig.refreshTokenSecret'),
                expiresIn: this.configService.get(
                    'authConfig.refreshTokenExpiresIn',
                ),
            },
        );

        return {
            accessToken,
            refreshToken,
        };
    }
}
