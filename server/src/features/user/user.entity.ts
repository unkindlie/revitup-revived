import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  CREATED_AT_COLUMN_NAME,
  UPDATED_AT_COLUMN_NAME,
} from '../../common/constants/database.constants';
import { UserRole } from './enums/user-role.enum';
import { DriverEntity } from '../drivers/driver.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  username: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Index('user_email_idx')
  email: string;

  @Column({
    type: 'enum',
    array: true,
    enum: UserRole,
    default: [UserRole.USER],
  })
  roles: UserRole[];

  @Column({
    name: 'is_verified',
    default: false,
  })
  isVerified: boolean;

  @CreateDateColumn({
    name: CREATED_AT_COLUMN_NAME,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: UPDATED_AT_COLUMN_NAME,
  })
  updatedAt: Date;

  @Column({ name: 'profile_img_url', type: 'text', nullable: true })
  profileImgUrl: string;

  @ManyToOne(() => DriverEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'favorite_driver_id' })
  favoriteDriver: DriverEntity | null;
}
