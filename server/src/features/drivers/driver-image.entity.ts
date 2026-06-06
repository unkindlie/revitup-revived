import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DriverEntity } from './driver.entity';

@Entity('driver_images')
export class DriverImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  order: number;

  @ManyToOne(() => DriverEntity, (driver) => driver.images)
  driver: DriverEntity;
}
