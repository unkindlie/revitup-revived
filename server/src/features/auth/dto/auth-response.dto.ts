import { TokensDto } from 'features/auth/dto/tokens.dto';
import { UserPayloadDto } from 'features/auth/dto/user-payload.dto';

export interface AuthResponseDto {
  user: UserPayloadDto;
  tokens: TokensDto;
}
