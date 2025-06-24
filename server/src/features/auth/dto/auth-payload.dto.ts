import { UserPayloadDto } from './user-payload.dto';

export interface AuthPayloadDto {
    sub: UserPayloadDto;
    iat: number;
    exp: number;
}
