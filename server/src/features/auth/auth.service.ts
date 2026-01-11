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
import { RefreshTokenService } from 'features/refresh-token/refresh-token.service';
import { UserCreateDto } from 'features/user/dto';
import { UserService } from 'features/user/user.service';
import { PasswordHelper } from './helpers/password.helper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private userSerivce: UserService,
    private tokenService: RefreshTokenService,
    private tokenHelper: TokenHelper,
    private passwordHelper: PasswordHelper,
  ) {}

  async register(input: UserCreateDto): Promise<void> {
    const exists = await this.userSerivce.userExistsByEmail(input.email);
    if (exists)
      throw new ConflictException({
        message: 'User with such email already exists',
        fields: { email: 'already_exists' },
      });

    input.password = await this.passwordHelper.hashPassword(input.password);

    await this.userSerivce.createUser(input);
  }
  async login(
    emailAddress: string,
    password: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userSerivce.getUserByEmail(emailAddress);

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
    await this.tokenService.createTokenEntry(tokens.refreshToken);

    return {
      user: payload,
      tokens,
    };
  }
  async refresh(
    payload: UserPayloadDto,
    oldRefreshToken: string,
  ): Promise<AuthResponseDto> {
    const tokenExistsInDb =
      await this.tokenService.isTokenAvailable(oldRefreshToken);
    if (!tokenExistsInDb)
      throw new ForbiddenException('Refresh token was not found');

    const user = await this.userSerivce.getUserByEmail(payload.email);
    const newPayload = plainToInstance(UserPayloadDto, user, {
      excludeExtraneousValues: true,
    });

    const tokens = await this.generateTokens(newPayload);
    await this.tokenService.updateTokenEntry({
      oldToken: oldRefreshToken,
      newToken: tokens.refreshToken,
    });

    return {
      user: newPayload,
      tokens,
    };
  }
  async changeRole(input: AuthRoleChangeDto) {
    const exists = await this.userSerivce.userExistsById(input.userId);
    if (!exists) throw new NotFoundException("This user doesn't exist");

    await this.userSerivce.updateUserInfo({
      id: input.userId,
      roles: input.roles,
    });
  }

  private async generateTokens(payload: UserPayloadDto): Promise<TokensDto> {
    const plain = instanceToPlain(payload);

    const accessToken = await this.tokenHelper.signPayload(plain, 'access');
    const refreshToken = await this.tokenHelper.signPayload(plain, 'refresh');

    return {
      accessToken,
      refreshToken,
    };
  }
}
