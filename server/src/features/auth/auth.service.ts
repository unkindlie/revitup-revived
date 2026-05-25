import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { compare } from 'bcrypt';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import authConfig from 'features/auth/auth.config';
import {
  AuthResponseDto,
  AuthRoleChangeDto,
  TokensDto,
  UserPayloadDto,
} from 'features/auth/dto';
import { TokenHelper } from 'features/auth/helpers/token.helper';
import { UserCreateDto } from 'features/user/dto';
import { UserService } from 'features/user/user.service';
import { PasswordHelper } from './helpers/password.helper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private userService: UserService,
    // private tokenService: RefreshTokenService,
    private tokenHelper: TokenHelper,
    private passwordHelper: PasswordHelper,
  ) {}

  async register(input: UserCreateDto): Promise<void> {
    const exists = await this.userService.userExistsByEmail(input.email);
    if (exists)
      throw new ConflictException({
        message: 'User with such email already exists',
        fields: { email: 'already_exists' },
      });

    input.password = await this.passwordHelper.hashPassword(input.password);

    await this.userService.createUser(input);
  }
  async login(
    emailAddress: string,
    password: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userService.getUserByEmail(emailAddress);

    const isPasswordMatching = await compare(password, user.password);
    if (!isPasswordMatching)
      throw new ForbiddenException({
        message: 'Password is invalid',
        fields: {
          password: 'wrong_pw',
        },
      });

    const payload = plainToInstance(UserPayloadDto, user, {
      excludeExtraneousValues: true,
    });
    const tokens = await this.generateTokens(payload);

    return {
      user: payload,
      tokens,
    };
  }
  async refresh(
    payload: UserPayloadDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    oldRefreshToken: string,
  ): Promise<AuthResponseDto> {
    // TODO: fix the bug after the base threads
    // const tokenExistsInDb =
    //   await this.tokenService.isTokenAvailable(oldRefreshToken);
    // if (!tokenExistsInDb)
    //   throw new ForbiddenException('Refresh token was not found');

    const user = await this.userService.getUserByEmail(payload.email);
    const newPayload = plainToInstance(UserPayloadDto, user, {
      excludeExtraneousValues: true,
    });

    const tokens = await this.generateTokens(newPayload);
    // await this.tokenService.updateTokenEntry({
    //   oldToken: oldRefreshToken,
    //   newToken: tokens.refreshToken,
    // });

    return {
      user: newPayload,
      tokens,
    };
  }
  async changeRole(input: AuthRoleChangeDto) {
    const exists = await this.userService.userExistsById(input.userId);
    if (!exists) throw new NotFoundException("This user doesn't exist");

    await this.userService.updateUserInfo({
      id: input.userId,
      roles: input.roles,
    });
  }
  async createGoogleUser(googleUser: UserCreateDto) {
    let user: UserCreateDto;

    try {
      user = await this.userService.getUserByEmail(googleUser.email);
    } catch {
      await this.register(googleUser);

      user = await this.userService.getUserByEmail(googleUser.email);
    }

    return plainToInstance(UserPayloadDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async generateTokens(payload: UserPayloadDto): Promise<TokensDto> {
    const plain = instanceToPlain(payload);

    const accessToken = await this.tokenHelper.signPayload(plain, 'access');
    const refreshToken = await this.tokenHelper.signPayload(plain, 'refresh');

    return {
      accessToken,
      refreshToken,
    };
  }
}
