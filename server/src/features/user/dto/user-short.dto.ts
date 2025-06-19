import { Expose } from 'class-transformer';

export class UserShortDto {
    @Expose()
    id: number;

    @Expose()
    username: string;
}
