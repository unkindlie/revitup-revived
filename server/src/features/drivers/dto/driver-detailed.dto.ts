import { DisciplineDto } from '../../disciplines/dto';

export class DriverDetailedDto {
  id: number;
  firstName: string;
  lastName: string;
  country?: string;
  dateOfBirth?: Date;
  profileImgUrl?: string;
  biography?: string;
  disciplines: DisciplineDto[];
  images: {
    id: number;
    imageUrl: string;
  }[];
}
