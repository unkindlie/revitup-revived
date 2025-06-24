import { Expose } from 'class-transformer';

export class UserPayloadDto {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    emailAddress: string;
}
