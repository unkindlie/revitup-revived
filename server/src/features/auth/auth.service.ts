import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';

import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { plainToInstance } from 'class-transformer';
import { UserPayloadDto } from './dto/user-payload.dto';

@Injectable()
export class AuthService {
    constructor(
        private userSerivce: UserService,
        private configService: ConfigService,
    ) {}

    async register(input: UserCreateDto): Promise<void> {
        const salt = parseInt(
            this.configService.getOrThrow<string>('authConfig.hashSaltAmount'),
        );
        input.password = await hash(input.password, salt);

        await this.userSerivce.createUser(input);
    }
    async login(emailAddress: string, password: string) {
        const user = await this.userSerivce.getUserByEmail(emailAddress);
        if (!user) throw new UnauthorizedException("This user doesn't exist");

        const isPasswordMatching = await compare(password, user.password);
        if (!isPasswordMatching)
            throw new ForbiddenException("Password doesn't match");

        return plainToInstance(UserPayloadDto, user, {
            excludeExtraneousValues: true,
        });
    }
}
