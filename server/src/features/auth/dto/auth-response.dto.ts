import { TokensDto } from './tokens.dto';
import { UserPayloadDto } from './user-payload.dto';

export interface AuthResponseDto {
    user: UserPayloadDto;
    tokens: TokensDto;
}
