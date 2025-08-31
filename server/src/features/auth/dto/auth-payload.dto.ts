import { UserPayloadDto } from 'features/auth/dto/user-payload.dto';

export interface AuthPayloadDto {
  sub: UserPayloadDto;
  iat: number;
  exp: number;
}
