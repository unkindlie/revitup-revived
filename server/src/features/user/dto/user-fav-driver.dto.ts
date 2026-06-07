import { IsInt, IsOptional } from 'class-validator';

export class UserFavDriverDto {
  @IsOptional()
  @IsInt()
  driverId?: number;
}
