import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  CREATED_AT_COLUMN_NAME,
  UPDATED_AT_COLUMN_NAME,
} from '../../common/constants/database.constants';
import { DisciplineEntity } from '../disciplines/discipline.entity';
import { DriverImageEntity } from './driver-image.entity';

@Entity('drivers')
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, name: 'first_name' })
  firstName: string;

  @Column({ length: 100, name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true, name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ nullable: true })
  profileImgUrl: string;

  @Column({ nullable: true })
  number: number;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @ManyToMany(() => DisciplineEntity)
  @JoinTable({
    name: 'driver_disciplines',
  })
  disciplines: DisciplineEntity[];

  @OneToMany(() => DriverImageEntity, (img) => img.driver)
  images: DriverImageEntity[];

  @CreateDateColumn({ name: CREATED_AT_COLUMN_NAME })
  createdAt: Date;

  @UpdateDateColumn({ name: UPDATED_AT_COLUMN_NAME })
  updatedAt: Date;
}
